using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kudotree.Models;

namespace Kudotree.Controllers
{
    public class ConnectionsController : Controller
    {
        [HttpPost]
        public JsonResult ConnRequest(int ToId)
        {
            Result result = new Result();

            Account acctCurrent = (Account)Session["User"];
            KudotreeEntities db = new KudotreeEntities();

            //Find existing connection request and/or connection
            AccountConnection acctConn = db.AccountConnections.SingleOrDefault(ac => ac.AccountId == acctCurrent.Id && ac.ConnectionId == ToId);
            Communication comm = db.Communications.SingleOrDefault(c =>
                c.CommMethodId == (int)CommType.Notification &&
                c.ActionId == (int)ActionType.ConnectRequest &&
                c.StatusId == (int)StatusType.New &&
                c.SenderId == acctCurrent.Id &&
                c.ReceiverId == ToId);

            //Only make connection request IF one hasn't been made, or connection doesn't already exist
            if (comm == null && acctConn == null)
            {
                comm = new Communication();
                comm.CommMethodId = (int)CommType.Notification;
                comm.ActionId = (int)ActionType.ConnectRequest;
                comm.StatusId = (int)StatusType.New;
                comm.SenderId = acctCurrent.Id;
                comm.ReceiverId = ToId;
                comm.Created = DateTime.Now;
                comm.CreatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                comm.LastUpdated = DateTime.Now;
                comm.LastUpdatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);

                db.Communications.Add(comm);

                try
                {
                    db.SaveChanges();

                    result.Success = true;
                }
                catch (Exception ex)
                {
                    result.Success = false;
                    result.MessageForLog = ex.Message;
                    result.MessageForUser = "There was a problem making the connection request.";
                }
            }

            return Json(result);
        }

    }
}
