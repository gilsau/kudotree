using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kudotree.Models;

namespace Kudotree.Controllers
{
    public class MessagesController : Controller
    {
        [HttpGet]
        [SessionCheckAttribute]
        public ActionResult Index(Guid? id, int rem = 0)
        {
            //Delete conversation
            if (rem == 1 && id.HasValue)
            {
                KudotreeEntities db = new KudotreeEntities();

                IEnumerable<Communication> comms = db.Communications.Where(c => c.ConversationId == id);

                foreach (Communication comm in comms)
                {
                    db.Communications.Remove(comm);
                }

                db.SaveChanges();
            }

            return View();
        }

        [HttpPost]
        [SessionCheckAttribute]
        public ActionResult Get(bool leftPanel, Guid? conversationId, int msgType, bool newMessages)
        {
            //Leftpanel Messages & Notifications
            if (leftPanel)
            {
                //Regular Messages
                if (msgType == 1)
                {
                    Result scrConvos;
                    IEnumerable<Conversation> convos = CommSvc.GetMyConversations(newMessages, 100, out scrConvos);
                    return PartialView("MsgDropDown", convos);
                }

                //Notifications
                else if (msgType == 2)
                {
                    Result scrNotes;
                    IEnumerable<Communication> notes = CommSvc.GetMyNotifications(100, out scrNotes);
                    return PartialView("NotesDropDown", notes);
                }
            }

            //Messages page, Conversation Panel
            ViewBag.CurrentConvoId = conversationId;
            Result scrMsgs;
            IEnumerable<Communication> msgs = CommSvc.GetMessagesByConversationId(conversationId, newMessages, out scrMsgs);

            return PartialView("~/Views/Messages/ConversationPanel.cshtml", msgs);
        }

        [HttpGet]
        [SessionCheckAttribute]
        public ActionResult Notifications(int accept = 0, int deny = 0, int id = 0)
        {
            Account acctCurrent = (Account)Session["User"];
            KudotreeEntities db = new KudotreeEntities();

            //Update notification
            if (deny > 0 || accept > 0)
            {
                //Get communication
                Communication comm = db.Communications.SingleOrDefault(c => c.Id == id);

                //Deny communication attempt
                if (deny > 0)
                {
                    comm.StatusId = (int)StatusType.Denied;

                    ViewBag.Msg = "Notification has been removed.";
                }

                //Accept communication attempt
                else if (accept > 0)
                {
                    comm.StatusId = (int)StatusType.Accepted;

                    //Add connection
                    if (comm.ActionId == (int)ActionType.ConnectRequest)
                    {
                        AccountConnection ac1 = new AccountConnection();
                        ac1.AccountId = comm.SenderId;
                        ac1.ConnectionId = comm.ReceiverId;
                        db.AccountConnections.Add(ac1);

                        AccountConnection ac2 = new AccountConnection();
                        ac2.AccountId = comm.ReceiverId;
                        ac2.ConnectionId = comm.SenderId;
                        db.AccountConnections.Add(ac2);

                        ViewBag.Msg = "Connection was added successfully.";
                    }

                    //Add kudo
                    if (comm.ActionId == (int)ActionType.SentKudos)
                    {
                        AccountKudo kudo = new AccountKudo();
                        kudo.GiverId = comm.SenderId;
                        kudo.ReceiverId = comm.ReceiverId;
                        kudo.Comment = comm.Msg;
                        kudo.Created = comm.Created;
                        kudo.CreatedBy = comm.CreatedBy;
                        kudo.LastUpdated = DateTime.Now;
                        kudo.LastUpdatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                        db.AccountKudoes.Add(kudo);
                        db.SaveChanges();

                        ViewBag.Msg = "The Kudo was added to your profile successfully.";
                    }

                }

                try
                {
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    ViewBag.Msg = string.Format("There was a problem updating the notification.<hr/>{0}", ex.Message);
                }
            }

            //Get notifications for current user
            Result result;
            List<Communication> comms = CommSvc.GetMyNotifications(100, out result).ToList();

            return View(comms);
        }

        [HttpPost]
        public JsonResult SendMessage(string Msg, int MessageToAcctId, Guid? ConversationId)
        {
            Result result = new Result();

            Account acctCurrent = (Account)Session["User"];
            KudotreeEntities db = new KudotreeEntities();

            Communication comm = new Communication();
            comm.CommMethodId = (int)CommType.InternalMessage;
            comm.ActionId = (int)ActionType.None;
            comm.StatusId = (int)StatusType.New;
            comm.SenderId = acctCurrent.Id;
            comm.ReceiverId = MessageToAcctId;
            comm.Msg = Msg;
            comm.ConversationId = ConversationId.HasValue ? ConversationId : Guid.NewGuid();
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
                result.MessageForLog = ex.Message;
                result.MessageForUser = "There was a problem sending the message.";
                result.Success = false;
            }

            return Json(result);
        }

        [HttpPost]
        public JsonResult SendKudos(string KudoComment, int KudoToAcctId)
        {
            Result result = new Result();

            Account acctCurrent = (Account)Session["User"];
            KudotreeEntities db = new KudotreeEntities();

            Communication comm = new Communication();
            comm.CommMethodId = (int)CommType.Notification;
            comm.ActionId = (int)ActionType.SentKudos;
            comm.StatusId = (int)StatusType.New;
            comm.SenderId = acctCurrent.Id;
            comm.ReceiverId = KudoToAcctId;
            comm.Msg = KudoComment;
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
                result.MessageForLog = ex.Message;
                result.MessageForUser = "There was a problem sending kudos.";
                result.Success = false;
            }

            return Json(result);
        }
    }

    public class MessageInfoHe
    {
        public int FromAcctId { get; set; }
        public int ToAcctId { get; set; }
        public Guid ConversationId { get; set; }
        public string Message { get; set; }
    }
}
