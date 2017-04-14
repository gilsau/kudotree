﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class KudotreeEntities : DbContext
    {
        public KudotreeEntities()
            : base("name=KudotreeEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountAssociation> AccountAssociations { get; set; }
        public DbSet<AccountBusiness> AccountBusinesses { get; set; }
        public DbSet<AccountConnection> AccountConnections { get; set; }
        public DbSet<AccountEducation> AccountEducations { get; set; }
        public DbSet<AccountExperience> AccountExperiences { get; set; }
        public DbSet<AccountInterest> AccountInterests { get; set; }
        public DbSet<AccountKudo> AccountKudoes { get; set; }
        public DbSet<AccountPost> AccountPosts { get; set; }
        public DbSet<AccountResume> AccountResumes { get; set; }
        public DbSet<AccountSkill> AccountSkills { get; set; }
        public DbSet<AccountToken> AccountTokens { get; set; }
        public DbSet<Action> Actions { get; set; }
        public DbSet<AssociationType> AssociationTypes { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<BusinessProductService> BusinessProductServices { get; set; }
        public DbSet<CommMethod> CommMethods { get; set; }
        public DbSet<Communication> Communications { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<Network> Networks { get; set; }
        public DbSet<NetworkMember> NetworkMembers { get; set; }
        public DbSet<Privacy> Privacies { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Status> Status { get; set; }
    }
}