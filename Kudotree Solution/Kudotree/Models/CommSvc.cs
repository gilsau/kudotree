using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kudotree.Models
{
    public static class CommSvc
    {
        private static KudotreeEntities db = new KudotreeEntities();

        public static Communication GetMostRecentMessageByConversationId(Guid? conversationId, out Result result)
        {
            result = new Result();

            Account acctCurrent = (Account)HttpContext.Current.Session["User"];

            Communication comm = null;
            try
            {
                //Get messages for this conversation, to update their status to READ, omit message I've sent to other person
                comm = (from c in db.Communications
                        .Include("Account")
                        .Include("Account1")
                        where c.ConversationId == conversationId
                        select c).OrderByDescending(c => c.LastUpdated).Take(1).First();

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.MessageForLog = result.MessageForLog = string.Format("MESSAGE:{0} --- INNER-EXCEPTION:{1} --- SOURCE:{2} --- STACK-TRACE:{3}", ex.Message, ex.InnerException, ex.Source, ex.StackTrace);
                result.MessageForUser = "There was a problem getting the most recent message for the conversation.";
            }

            //Log errors
            if (!result.Success) LogSvc.LogError(result.MessageForLog);

            return comm;
        }

        public static IList<Communication> GetMessagesByConversationId(Guid? conversationId, bool newMessages, out Result result)
        {
            result = new Result();

            Account acctCurrent = (Account)HttpContext.Current.Session["User"];

            IList<Communication> comms = null;
            try
            {
                //Get messages for this conversation
                if (newMessages)
                {
                    comms = (from c in db.Communications
                             .Include("Account")
                             .Include("Account1")
                             where c.ConversationId == conversationId
                             && c.StatusId == (int)StatusType.New
                             select c).ToList();
                }
                else
                {
                    comms = (from c in db.Communications
                             .Include("Account")
                             .Include("Account1")
                             where c.ConversationId == conversationId
                             select c).ToList();
                }

                //Update status
                foreach (Communication comm in comms)
                {
                    //Mark the message as "READ", if the current user viewing the message, is NOT the Sender
                    if (acctCurrent.Id != comm.SenderId)
                    {
                        db.Communications.SingleOrDefault(c => c.Id == comm.Id).StatusId = (int)StatusType.Read;
                    }
                }
                db.SaveChanges();

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.MessageForLog = result.MessageForLog = string.Format("MESSAGE:{0} --- INNER-EXCEPTION:{1} --- SOURCE:{2} --- STACK-TRACE:{3}", ex.Message, ex.InnerException, ex.Source, ex.StackTrace);
                result.MessageForUser = "There was a problem getting a list of messages.";
            }

            //Log errors
            if (!result.Success) LogSvc.LogError(result.MessageForLog);

            return comms;
        }

        public static IEnumerable<Conversation> GetMyConversations(bool newMessages, int howMany, out Result result)
        {
            result = new Result();

            Account acctCurrent = (Account)HttpContext.Current.Session["User"];

            IEnumerable<Conversation> convos = null;
            try
            {
                //Leftpanel
                if (newMessages)
                {
                    convos = (from c in db.Communications
                              .Include("Account")
                              .Include("Account1")
                              where c.ActionId == (int)ActionType.None
                              && (c.ReceiverId == acctCurrent.Id)
                              && c.StatusId == (int)StatusType.New
                              group c by c.ConversationId into g
                              select new Conversation() { Id = g.Key, LastUpdated = g.Max(c => c.LastUpdated), Props = g })
                        .OrderByDescending(g => g.LastUpdated);
                }

                //Messages page
                else
                {
                    convos = (from c in db.Communications
                              .Include("Account")
                              .Include("Account1")
                              where c.ActionId == (int)ActionType.None
                              && (c.ReceiverId == acctCurrent.Id || c.SenderId == acctCurrent.Id)
                              group c by c.ConversationId into g
                              select new Conversation() { Id = g.Key, LastUpdated = g.Max(c => c.LastUpdated), Props = g })
                        .OrderByDescending(g => g.LastUpdated);
                }

                if (howMany > 0)
                {
                    convos = convos.Take(howMany);
                }

                result.Success = true;
            }
            catch (Exception ex)
            {
                result.MessageForLog = result.MessageForLog = string.Format("MESSAGE:{0} --- INNER-EXCEPTION:{1} --- SOURCE:{2} --- STACK-TRACE:{3}", ex.Message, ex.InnerException, ex.Source, ex.StackTrace);
                result.MessageForUser = "There was a problem getting the conversation list.";
            }

            //Log errors
            if (!result.Success) LogSvc.LogError(result.MessageForLog);

            return convos;
        }

        public static IEnumerable<Communication> GetMyNotifications(int howMany, out Result scr)
        {
            scr = new Result();

            Account acctCurrent = (Account)HttpContext.Current.Session["User"];

            IEnumerable<Communication> notes = null;
            try
            {
                //Get all notes
                notes = db.Communications.Where(c => c.StatusId == (int)StatusType.New && c.ActionId != (int)ActionType.None && c.CommMethodId == (int)CommType.Notification && c.ReceiverId == acctCurrent.Id && c.SenderId != acctCurrent.Id);
                
                //Order and return # of notes requested
                if (notes != null)
                {
                    notes = notes.OrderByDescending(c => c.LastUpdated).Take(howMany);
                }
            }
            catch (Exception ex)
            {
                scr.MessageForLog = scr.MessageForLog = string.Format("MESSAGE:{0} --- INNER-EXCEPTION:{1} --- SOURCE:{2} --- STACK-TRACE:{3}", ex.Message, ex.InnerException, ex.Source, ex.StackTrace);
                scr.MessageForUser = "There was a problem getting the notifications.";
            }

            if (notes != null && howMany > 0)
            {
                notes = notes.Take(howMany);
            }

            //Log errors
            if (!scr.Success) LogSvc.LogError(scr.MessageForLog);

            return notes;
        }
    }
        
    public class Conversation
    {
        public Guid? Id { get; set; }
        public DateTime LastUpdated { get; set; }
        public IGrouping<Guid?, Communication> Props { get; set; }
    }
}
