using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kudotree.Helpers;
using Kudotree.Models;

namespace Kudotree.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [SessionCheckAttribute]
        public ActionResult Index(string listby = "-1", int rem = 0, int id = 0)
        {
            KudotreeEntities db = new KudotreeEntities();
            Account acctCurrent = (Account)Session["User"];

            if (rem > 0 && id > 0)
            {
                //Get post to remove
                AccountPost acctPost = db.AccountPosts.SingleOrDefault(ap => ap.Id == id);

                //Remove post
                if (acctPost != null)
                {
                    //Remove all notifications for this post
                    IEnumerable<Communication> comms = db.Communications.Where(c => c.LinkId == acctPost.Id);
                    foreach (Communication comm in comms)
                    {
                        db.Communications.Remove(comm);
                    }
                    
                    //Remove all replies first
                    IEnumerable<AccountPost> replies = db.AccountPosts.Where(r => r.ParentAccountPostId == acctPost.Id);
                    foreach (AccountPost reply in replies)
                    {
                        db.AccountPosts.Remove(reply);
                    }
                    db.AccountPosts.Remove(acctPost);

                    db.SaveChanges();
                }
            }
            
            return View(GetPosts(listby));
        }

        private IEnumerable<AccountPost> GetPosts(string listby = "")
        {
            KudotreeEntities db = new KudotreeEntities();
            Account acctCurrent = (Account)Session["User"];

            IEnumerable<AccountPost> posts = null;

            if (acctCurrent != null)
            {
                switch (listby)
                {
                    case "-1":

                        //Connections
                        IEnumerable<int> connIds = acctCurrent.AccountConnections.Select(ac => ac.ConnectionId);

                        //Posts made by connections
                        posts = db.AccountPosts.Where(ap => ((connIds.Contains(ap.PostedByAccountId)) || ap.PostedByAccountId == acctCurrent.Id) && ap.ParentAccountPostId == null);
                        if (posts != null)
                        {
                            posts = posts.OrderByDescending(p => p.Created);
                        }

                        break;
                    case "-2":

                        //Connections that have ME in preferred networks
                        IEnumerable<int> prefmeIds = acctCurrent.NetworkMembers.Where(nm => nm.Network.IsPreferred == true && nm.MemberId == acctCurrent.Id).Select(nm2 => nm2.Account.Id);

                        //Posts made by connections
                        posts = db.AccountPosts.Where(ap => prefmeIds.Contains(ap.PostedByAccountId) && ap.ParentAccountPostId == null);
                        if (posts != null)
                        {
                            posts = posts.OrderByDescending(p => p.Created);
                        }

                        break;

                    case "-3":

                        break;
                }
            }

            return posts;
        }

        [HttpPost]
        [SessionCheckAttribute]
        public ActionResult Index(PostInfo info)
        {
            info.ListBy = string.IsNullOrEmpty(info.ListBy) ? "all" : info.ListBy;

            KudotreeEntities db = new KudotreeEntities();
            Account acctCurrent = (Account)Session["User"];

            //Post info
            AccountPost ap = info.AccountPostId > 0 ? db.AccountPosts.SingleOrDefault(p => p.Id == info.AccountPostId) : new AccountPost();
            ap.ParentAccountPostId = info.ParentAccountPostId > 0 ? info.ParentAccountPostId : ap.ParentAccountPostId;
            ap.PostedByAccountId = acctCurrent.Id;
            ap.Created = DateTime.Now;

            //Image
            if (info.ImagePost != null)
            {
                if (info.ImagePost.ContentLength > 0)
                {
                    Result result;

                    //Upload file
                    Uploader.UploadFile(info.ImagePost, "postimages", out result);

                    //Save in database
                    if (result.Success && result.DynObject != null)
                    {
                        ap.PhotoFile = result.DynObject;
                    }
                }
            }

            ap.PrivacyId = info.Privacy > 0 ? info.Privacy : ap.PrivacyId;
            ap.Comment = string.IsNullOrEmpty(info.Comment) ? string.Empty : info.Comment;

            //Add new post
            AccountPost postJustAdded = null;
            if (info.AccountPostId == 0)
            {
                postJustAdded = db.AccountPosts.Add(ap);
            }

            //Save post
            db.SaveChanges();

            //Enter notification (ONLY for reply)
            if (info.ParentAccountPostId > 0)
            {
                int toId = db.AccountPosts.SingleOrDefault(ap2 => ap2.Id == info.ParentAccountPostId).PostedByAccountId;
                Communication comm = new Communication();
                comm.CommMethodId = (int)CommType.Notification;
                comm.ActionId = (int)ActionType.Commented;
                comm.StatusId = (int)StatusType.New;
                comm.SenderId = acctCurrent.Id;
                comm.ReceiverId = toId;
                comm.Msg = info.Comment;
                comm.LinkId = ap.Id;
                comm.Created = DateTime.Now;
                comm.CreatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                comm.LastUpdated = DateTime.Now;
                comm.LastUpdatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                db.Communications.Add(comm);
            }
            db.SaveChanges();

            //Get updated user
            Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);

            return View(GetPosts(info.ListBy));
        }

        [HttpPost]
        public ActionResult Search(SearchCriteria criteria)
        {
            criteria.Keywords = criteria.Keywords.ToLower();

            IEnumerable<Account> people = null;
            IEnumerable<Account> skills = null;
            IEnumerable<Business> companies = null;
            IEnumerable<Business> services = null;

            KudotreeEntities db = new KudotreeEntities();

            if (criteria.Keywords != null)
            {
                people = db.Accounts.Where(a =>
                    criteria.Keywords.Contains(a.Firstname.ToLower()) ||
                    criteria.Keywords.Contains(a.Lastname.ToLower()) ||
                    a.Firstname.Contains(criteria.Keywords) ||
                    a.Lastname.Contains(criteria.Keywords)).OrderBy(a => a.Firstname).OrderBy(a => a.Lastname);

                skills = db.AccountSkills.Where(s =>
                    criteria.Keywords.Contains(s.Name.ToLower()) ||
                    s.Name.Contains(criteria.Keywords)).Select(s => s.Account).OrderBy(a => a.Firstname).OrderBy(a => a.Lastname);

                companies = db.Businesses.Where(b =>
                    criteria.Keywords.Contains(b.Name.ToLower()) ||
                    b.Name.Contains(criteria.Keywords)).OrderBy(b => b.Name);

                services = db.BusinessProductServices.Where(bp =>
                    criteria.Keywords.Contains(bp.ProductService.ToLower()) ||
                    bp.ProductService.Contains(criteria.Keywords)).Select(bp => bp.Business).OrderBy(b => b.Name);
            }

            ViewBag.People = people;
            ViewBag.Skills = skills;
            ViewBag.Companies = companies;
            ViewBag.Services = services;

            return View();
        }
    }

    public class SearchCriteria
    {
        public string Keywords { get; set; }
    }

    public class PostInfo
    {
        public string Comment { get; set; }
        public int Privacy { get; set; }
        public HttpPostedFileBase ImagePost { get; set; }
        public string ListBy { get; set; }
        public int ParentAccountPostId { get; set; }
        public int AccountPostId { get; set; }
    }
}
