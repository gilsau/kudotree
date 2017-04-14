using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kudotree.Models;

namespace Kudotree.Controllers
{
    public class KudotreeController : Controller
    {
        [HttpGet]
        public JsonResult AddToPrefNet(int ConnIdToAddToPrefNet = 0, string[] ArrPrefNets = null)
        {
            Result result = new Result();
            KudotreeEntities db = new KudotreeEntities();

            //Add connection to preferred networks
            if (ArrPrefNets != null && ConnIdToAddToPrefNet > 0)
            {
                foreach (string prefNetId in ArrPrefNets)
                {
                    int netId = int.Parse(prefNetId);

                    //Only add to network, if not already a member
                    if (db.NetworkMembers.SingleOrDefault(nm => nm.NetworkId == netId && nm.MemberId == ConnIdToAddToPrefNet) == null)
                    {
                        db.NetworkMembers.Add(new NetworkMember() { NetworkId = int.Parse(prefNetId), MemberId = ConnIdToAddToPrefNet });
                    }
                }

                try
                {
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    result.Success = false;
                    result.MessageForUser = ex.Message;
                }
            }

            return Json(result);
        }

        [HttpGet]
        [SessionCheckAttribute]
        public ActionResult Manage(string Keyword = "", int NetworkIdToSearchOn = 0, string SortBy = "", string SortDirection = "asc", int ConnIdToRemove = 0, string NetworkName = "", int IsPreferredNetwork = 0, int NetworkIdToUpdate = 0, string NetworkNameEdit = "", int IsPreferredNetworkEdit = 0, int NetworkIdToRemove = 0, string[] ArrRegNets = null, int ConnIdToAddToNet = 0)
        {
            Account acctCurrent = (Account)Session["User"];
            KudotreeEntities db = new KudotreeEntities();

            //Add connection to regular networks
            if (ArrRegNets != null && ConnIdToAddToNet > 0)
            {
                //Remove this connection from all of current user's networks
                IEnumerable<int> currUserNets = db.Networks.Where(n => n.OwnerId == acctCurrent.Id).Select(n => n.Id);
                IEnumerable<NetworkMember> connMemberships = db.NetworkMembers.Where(nm => currUserNets.Contains(nm.NetworkId) && nm.MemberId == ConnIdToAddToNet);
                foreach (NetworkMember member in connMemberships)
                {
                    db.NetworkMembers.Remove(member);
                }
                
                //Add this user to networks
                foreach (string regNetId in ArrRegNets)
                {
                    int netId = int.Parse(regNetId);
                    db.NetworkMembers.Add(new NetworkMember() { NetworkId = int.Parse(regNetId), MemberId = ConnIdToAddToNet });
                }
                db.SaveChanges();
            }

            //Remove Connection
            if(ConnIdToRemove > 0){
                IEnumerable<AccountConnection> connsToRemove = db.AccountConnections.Where(ac => (ac.AccountId == ConnIdToRemove && ac.ConnectionId == acctCurrent.Id) || (ac.AccountId == acctCurrent.Id && ac.ConnectionId == ConnIdToRemove));
                foreach(AccountConnection ac in connsToRemove){
                    db.AccountConnections.Remove(ac);
                }
                db.SaveChanges();

                //Update session user, with new connections
                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);
            }

            //Create new network
            if (!string.IsNullOrEmpty(NetworkName))
            {
                Network networkFound = db.Networks.SingleOrDefault(n => n.OwnerId == acctCurrent.Id && n.Name.ToLower().Trim() == NetworkName.ToLower().Trim());

                if (networkFound == null)
                {
                    db.Networks.Add(new Network() { OwnerId = acctCurrent.Id, Name = NetworkName, IsPreferred = (IsPreferredNetwork == 1 ? true : false) });
                    db.SaveChanges();

                    Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);
                }
            }

            //Update network
            if (NetworkIdToUpdate > 0)
            {
                Network netToUpdate = db.Networks.SingleOrDefault(n => n.Id == NetworkIdToUpdate);
                netToUpdate.Name = NetworkNameEdit;
                netToUpdate.IsPreferred = (IsPreferredNetworkEdit == 1 ? true : false);
                db.SaveChanges();

                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);
            }

            //Remove network
            if (NetworkIdToRemove > 0)
            {
                Network netToRemove = db.Networks.SingleOrDefault(n => n.Id == NetworkIdToRemove);

                if(netToRemove != null){
                    db.Networks.Remove(netToRemove);
                    db.SaveChanges();
                }
            }
            
            //Get connections
            IEnumerable<Account> conns = null;
            if (acctCurrent != null)
            {
                conns = acctCurrent.AccountConnections.Select(a => a.Account1);

                //Search by keyword
                if (!string.IsNullOrEmpty(Keyword))
                {
                    Keyword = Keyword.ToLower();
                    conns = conns.Where(c =>
                        c.Firstname.ToLower().Contains(Keyword) || Keyword.Contains(c.Firstname.ToLower())
                        || c.Lastname.ToLower().Contains(Keyword) || Keyword.Contains(c.Lastname.ToLower()));
                }

                //Search by network
                if (NetworkIdToSearchOn > 0)
                {
                    
                }

                //Sort
                SortBy = string.IsNullOrEmpty(SortBy) ? "Firstname" : SortBy;
                var pi = typeof(Account).GetProperty(SortBy);

                if (SortDirection == "asc")
                {
                    conns = conns.OrderBy(x => pi.GetValue(x, null));
                }
                else if (SortDirection == "desc")
                {
                    conns = conns.OrderByDescending(x => pi.GetValue(x, null));
                }
            }
            
            return View(conns);
        }
    }
}
