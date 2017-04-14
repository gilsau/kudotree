using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;

namespace Kudotree.Helpers
{
    public static class Renderer
    {
        public static string RenderPost(string post)
        {
            //Replace url with link
            string regex = @"((www\.|(http|https|ftp|news|file)+\:\/\/)[&#95;.a-z0-9-]+\.[a-z0-9\/&#95;:@=.+?,##%&~-]*[^.|\'|\# |!|\(|?|,| |>|<|;|\)])";
            Regex r = new Regex(regex, RegexOptions.IgnoreCase);
            post = r.Replace(post, "<a href=\"$1\" title=\"Click to open in a new window or tab\" target=\"&#95;blank\">$1</a>").Replace("href=\"www", "href=\"http://www");

            //Replace carriage returns
            post = post.Replace(Environment.NewLine, "<br/>");
            
            return post;
        }
    }
}