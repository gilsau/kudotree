using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kudotree.Models
{
    public enum StatusType
    {
        New = 1,
        Read = 2,
        Accepted = 3,
        Denied = 4,
        Online = 5,
        Offline = 6,
        Active = 7
    }

    public enum ActionType
    {
        ConnectRequest = 1,
        CalendarRequest = 2,
        CalendarAccept = 3,
        NeedRequest = 4,
        SentKudos = 5,
        PrefersYou = 6,
        Commented = 7,
        None = 8
    }

    public enum CommType
    {
        Email = 1,
        InternalMessage = 2,
        Notification = 3,
        TextMessage = 4
    }

    public enum PrivacyType
    {
        Connections = 1,
        Public = 2
    }
}