//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Kudotree
{
    using System;
    using System.Collections.Generic;
    
    public partial class Network
    {
        public Network()
        {
            this.NetworkMembers = new HashSet<NetworkMember>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerId { get; set; }
        public Nullable<bool> IsPreferred { get; set; }
    
        public virtual Account Account { get; set; }
        public virtual ICollection<NetworkMember> NetworkMembers { get; set; }
    }
}
