using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace Kudotree.Helpers
{
    static public class Profiler
    {
        static public string RenderProfileLink(Account acct = null, DateTime? dateTime = null, int picHt = 50)
        {
            //Get DateTime offset
            string days = string.Empty;
            string hours = string.Empty;
            string mins = string.Empty;
            
            string city = !string.IsNullOrEmpty(acct.City) ? acct.City : string.Empty;
            string state = acct.State != null ? acct.State.Abbrev : string.Empty;
            string cntry = acct.Country != null ? acct.Country.Abbrev : string.Empty;
            if (!string.IsNullOrEmpty(city) && !string.IsNullOrEmpty(state)) city = city + ", ";

            if (dateTime != null)
            {
                TimeUtility.LongAgo(out days, out hours, out mins, DateTime.Parse(dateTime.ToString()));
            }

            StringBuilder sb = new StringBuilder("<div>");
            sb.Append(string.Format("<small class='pull-right'><b>{0} {1} {2} ago</b></small>", days, hours, mins));
            sb.Append(string.Format("<div style='display:inline-block;vertical-align:top;padding:5px;'><a href='~/account/profile?id={0}'><img src='~/profilepics/{1}' style='height:{2}px;' /></a></div>", acct.Id, acct.ProfilePic, picHt));
            sb.Append(string.Format("<div style='display:inline-block;vertical-align:top;padding:5px;'>"));
            sb.Append(string.Format("<b>{0} {1}</b>", acct.Firstname, acct.Lastname));
            if (!string.IsNullOrEmpty(acct.JobTitle)) sb.Append(string.Format("<br/><small><b>{0}</b></small>", acct.JobTitle));
            if (!string.IsNullOrEmpty(city) || !string.IsNullOrEmpty(state) || !string.IsNullOrEmpty(cntry)) sb.Append(string.Format("<br/><small><b>{0} {1} {2}</b></small>", city, state, cntry));
            sb.Append(string.Format("</div>"));
            sb.Append(string.Format("</div>"));

            return sb.ToString();
        }
    }
}