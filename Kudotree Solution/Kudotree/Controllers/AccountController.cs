using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.IO;
using Kudotree.Helpers;
using Kudotree.Models;

namespace Kudotree.Controllers
{
    public class AccountController : Controller
    {
        KudotreeEntities db = new KudotreeEntities();

        [HttpGet]
        public ActionResult Calendar(int AccountId = 0, int Month = 0, int Year = 0)
        {
            ViewBag.Month = Month;
            ViewBag.Year = Year;

            return PartialView("Calendar");
        }

        [HttpGet]
        public ActionResult Login(int logout = 0)
        {
            if (logout == 1)
            {
                Session.Abandon();
            }

            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginUser user)
        {
            Account acct = db.Accounts.SingleOrDefault(a => a.Email.ToLower() == user.Email.ToLower() && a.Password == user.Password && a.Active == true);

            if (acct != null)
            {
                Session["User"] = acct;
                return RedirectToAction("../home");
            }
            else
            {
                Session["User"] = null;
                TempData["Error"] = "Login failed. Please try again.";
                return View();
            }
        }

        [HttpPost]
        public ActionResult SignUp(SignUpUser user)
        {
            //Save new user
            Account acctDuplicate = db.Accounts.SingleOrDefault(a => a.Email.ToLower() == user.Email.ToLower());
            if (acctDuplicate == null)
            {
                Account acctAdd = new Account();
                acctAdd.Firstname = user.FirstName;
                acctAdd.Lastname = user.LastName;
                acctAdd.Email = user.Email;
                acctAdd.Password = Membership.GeneratePassword(7, 1);
                acctAdd.ProfilePic = "default.jpg";
                acctAdd.Active = false;
                acctAdd.Created = DateTime.Now;
                acctAdd.CreatedBy = "signup";
                acctAdd.LastUpdated = DateTime.Now;
                acctAdd.LastUpdatedBy = "signup";

                db.Accounts.Add(acctAdd);
                db.SaveChanges();

                Account acctJustAdded = db.Accounts.SingleOrDefault(a => a.Email.ToLower() == user.Email.ToLower());

                //Create token
                AccountToken token = new AccountToken();
                token.AccountId = acctJustAdded.Id;
                token.Token = Guid.NewGuid();
                token.Expired = false;
                token.Created = DateTime.Now;

                db.AccountTokens.Add(token);
                db.SaveChanges();

                //Send email verification
                Result result = new Result();

                string server = Request.ServerVariables["server_name"];
                string port = ":" + Request.ServerVariables["server_port"];
                string baseAddress = server + port;

                Emailer.SendMail("Welcome to Kudotree! Verify your email address.", "Our records show that your email was used to sign up for an account at Kudotree.<br/><br/>Your temporary password is: " + acctAdd.Password + "<br/><br/>If this is a valid registration, please verify your email by clicking on the link below:<br/><br/><a href=\"http://" + baseAddress + "/account/verifyemail?token=" + token.Token.ToString() + "\">http://" + baseAddress + "/account/verifyemail?token=" + token.Token.ToString() + "</a>", "admin@Kudotree.com", "Kudotree Admin", user.Email, out result);

                TempData["Msg"] = "Thank you for signing up with Kudotree. An email verification was sent to your email address. Please check your email and follow instructions.";
            }
            else
            {
                TempData["Error"] = "This user already exists. Please use another email address.";
            }

            return RedirectToAction("login");
        }

        [HttpPost]
        public string SendPassword(string Email)
        {
            // Generate a new 7-character password with 1 non-alphanumeric character.
            string password = Membership.GeneratePassword(7, 1);

            //Find account
            Account acctFound = db.Accounts.SingleOrDefault(a => a.Email.ToLower() == Email.ToLower());
            if (acctFound != null)
            {
                acctFound.Password = password;
                db.SaveChanges();

                string server = Request.ServerVariables["server_name"];
                string port = ":" + Request.ServerVariables["server_port"];
                string baseAddress = server + port;

                Result result = new Result();
                Emailer.SendMail("Kudotree Password Reset", "Hi " + acctFound.Firstname + ",<br/><br/>There was a request made to reset your password. Here is the temporary password set for your account: " + password + "<br/><br/>Login in with this temporary password, then go to your Profile to change it.<br/><br/><a href=\"http://" + baseAddress + "/account/login\">http://" + baseAddress + "/account/login</a>", "admin@kudotree.com", "Kudotree Admin", acctFound.Email, out result);

                return "ok";
            }
            else
            {
                return "The email provided could not be found. Please signup below, it's FREE!";
            }
        }

        [HttpGet]
        public ActionResult VerifyEmail(Guid token)
        {
            AccountToken acctToken = db.AccountTokens.SingleOrDefault(at => at.Token == token);
            Account acct = db.Accounts.SingleOrDefault(a => a.Id == acctToken.AccountId);
            acct.Active = true;
            db.SaveChanges();

            Session["User"] = acct;
            TempData["verify"] = 1;
            TempData["edit"] = 1;

            return RedirectToAction("Profile");
        }

        [HttpGet]
        public ActionResult Profile(int id = 0, int edit = 0, int bid = 0, int skid = 0, int jid = 0, int sid = 0)
        {
            //Delete business from account
            if (bid > 0)
            {
                AccountBusiness abus = db.AccountBusinesses.SingleOrDefault(ab => ab.AccountId == id && ab.BusinessId == bid);

                db.AccountBusinesses.Remove(abus);
                db.SaveChanges();

                //Update session user account
                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == id);
            }

            //Delete skill
            if (skid > 0)
            {
                AccountSkill askill = db.AccountSkills.SingleOrDefault(sk => sk.Id == skid);

                db.AccountSkills.Remove(askill);
                db.SaveChanges();

                //Update session user account
                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == id);
            }

            //Delete job
            if (jid > 0)
            {
                AccountExperience job = db.AccountExperiences.SingleOrDefault(j => j.Id == jid);

                db.AccountExperiences.Remove(job);
                db.SaveChanges();

                //Update session user account
                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == id);
            }

            //Delete school
            if (sid > 0)
            {
                AccountEducation school = db.AccountEducations.SingleOrDefault(s => s.Id == sid);

                db.AccountEducations.Remove(school);
                db.SaveChanges();

                //Update session user account
                Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == id);
            }


            ViewBag.States = db.States.ToList();
            ViewBag.Countries = db.Countries.ToList();
            return View();
        }

        [HttpPost]
        [SessionCheckAttribute]
        public ActionResult Profile(ProfileUser user)
        {
            Account acctCurrent = (Account)Session["User"];
            Account acctToUpdate = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);

            //Profle Pic
            if (user.ProfilePic != null)
            {
                if (user.ProfilePic.ContentLength > 0)
                {
                    Result result;

                    //Upload file
                    Uploader.UploadFile(user.ProfilePic, "profilepics", out result);

                    //Save in database
                    if (result.Success && result.DynObject != null)
                    {
                        acctToUpdate.ProfilePic = result.DynObject;
                    }
                }
            }

            //Other info
            acctToUpdate.Firstname = !string.IsNullOrEmpty(user.Firstname) ? user.Firstname : acctToUpdate.Firstname;
            acctToUpdate.Lastname = !string.IsNullOrEmpty(user.Lastname) ? user.Lastname : acctToUpdate.Lastname;
            acctToUpdate.Email = !string.IsNullOrEmpty(user.Email) ? user.Email : acctToUpdate.Email;
            acctToUpdate.Password = !string.IsNullOrEmpty(user.Password) ? user.Password : acctToUpdate.Password;
            acctToUpdate.City = !string.IsNullOrEmpty(user.City) ? user.City : acctToUpdate.City;
            acctToUpdate.StateId = user.StateId > 0 ? user.StateId : acctToUpdate.StateId;
            acctToUpdate.CountryId = user.CountryId > 0 ? user.CountryId : acctToUpdate.CountryId;
            acctToUpdate.Zipcode = !string.IsNullOrEmpty(user.Zipcode) ? user.Zipcode : acctToUpdate.Zipcode;
            acctToUpdate.Gender = user.Gender > 0 ? user.Gender : acctToUpdate.Gender;
            acctToUpdate.DOB = !string.IsNullOrEmpty(user.DOB) ? DateTime.Parse(user.DOB) : acctToUpdate.DOB;
            acctToUpdate.JobTitle = !string.IsNullOrEmpty(user.JobTitle) ? user.JobTitle : acctToUpdate.JobTitle;
            acctToUpdate.Summary = !string.IsNullOrEmpty(user.Summary) ? user.Summary : acctToUpdate.Summary;
            acctToUpdate.JobSeeker = user.JobSeeker;
            acctToUpdate.JobSeekerKudoHelp = user.JobSeekerKudoHelp;
            acctToUpdate.BusinessOwner = user.BusinessOwner;
            acctToUpdate.BusinessOwnerKudoHelp = user.BusinessOwnerKudoHelp;
            acctToUpdate.Student = user.Student;
            acctToUpdate.StudentKudoHelp = user.StudentKudoHelp;

            ViewBag.Msg = "Account has been updated successfully";

            //Add new business to account
            if (!string.IsNullOrEmpty(user.BusinessName))
            {
                Business bus = new Business();
                bus.Name = user.BusinessName;
                bus.Address1 = user.BusinessAddress1;
                bus.Address2 = user.BusinessAddress2;
                bus.City = user.BusinessCity;
                bus.StateId = user.BusinessStateId;
                bus.CountryId = user.BusinessCountryId;
                bus.Zipcode = user.BusinessZipcode;

                Business busAdded = db.Businesses.Add(bus);
                db.SaveChanges();

                AccountBusiness ab = new AccountBusiness();
                ab.AccountId = acctCurrent.Id;
                ab.BusinessId = busAdded.Id;
                db.AccountBusinesses.Add(ab);

                //Add Business Product
                string[] prods = user.BusinessProduct.Split(',');

                foreach (string prod in prods)
                {
                    BusinessProductService bps = new BusinessProductService();
                    bps.BusinessId = busAdded.Id;
                    bps.ProductService = prod;

                    db.BusinessProductServices.Add(bps);
                }

                ViewBag.Msg = "Business has been added successfully";
            }

            //Resume
            if (user.ResumeFile != null)
            {
                if (user.ResumeFile.ContentLength > 0)
                {
                    Result result;

                    //Upload file
                    Uploader.UploadFile(user.ResumeFile, "resumes", out result);

                    //Save in database
                    if (result.Success && result.DynObject != null)
                    {
                        acctToUpdate.ResumeFile = result.DynObject;

                        ViewBag.Msg = "Resume was uploaded successfully.";
                    }
                }
            }

            //Add Skill
            if (!string.IsNullOrEmpty(user.SkillName))
            {
                AccountSkill acctSkill = new AccountSkill();
                acctSkill.AccountId = acctCurrent.Id;
                acctSkill.Name = user.SkillName;
                acctSkill.Proficiency = user.SkillProficiency;
                acctSkill.YearsUsed = user.SkillYearsUsed;

                db.AccountSkills.Add(acctSkill);
                db.SaveChanges();

                ViewBag.Msg = "Skill was added successfully.";
            }

            //Add Job
            if (!string.IsNullOrEmpty(user.JobCompanyName))
            {
                Business bus = new Business();
                bus.Name = user.JobCompanyName;
                bus.Address1 = user.JobCompanyAddress1;
                bus.Address2 = user.JobCompanyAddress2;
                bus.City = user.JobCompanyCity;
                bus.StateId = user.JobCompanyStateId;
                bus.CountryId = user.JobCompanyCountryId;
                bus.Zipcode = user.JobCompanyZipcode;

                Business busAdded = db.Businesses.Add(bus);
                db.SaveChanges();

                AccountExperience acctExperience = new AccountExperience();
                acctExperience.AccountId = acctCurrent.Id;
                acctExperience.BusinessId = busAdded.Id;
                acctExperience.JobTitle = user.JobPosition;
                acctExperience.DateFrom = user.JobFrom;
                acctExperience.DateTo = user.JobTo;
                acctExperience.Description = user.JobDescription;

                db.AccountExperiences.Add(acctExperience);

                db.SaveChanges();

                ViewBag.Msg = "Experience was added successfully.";
            }

            //Add Education
            if (!string.IsNullOrEmpty(user.SchoolName))
            {
                Business bus = new Business();
                bus.Name = user.SchoolName;
                bus.Address1 = user.SchoolAddress1;
                bus.Address2 = user.SchoolAddress2;
                bus.City = user.SchoolCity;
                bus.StateId = user.SchoolStateId;
                bus.CountryId = user.SchoolCountryId;
                bus.Zipcode = user.SchoolZipcode;

                Business busAdded = db.Businesses.Add(bus);
                db.SaveChanges();

                AccountEducation acctEducation = new AccountEducation();
                acctEducation.AccountId = acctCurrent.Id;
                acctEducation.BusinessId = busAdded.Id;
                acctEducation.YearAttendedFrom = user.SchoolFrom;
                acctEducation.YearAttendedTo = user.SchoolTo;
                acctEducation.Certification = user.SchoolCertification;

                db.AccountEducations.Add(acctEducation);

                db.SaveChanges();

                ViewBag.Msg = "Education was added successfully.";
            }

            //Give Kudos
            if (!string.IsNullOrEmpty(user.KudoComment))
            {
                AccountKudo ak = new AccountKudo();
                ak.ReceiverId = user.ProfileAcctId;
                ak.GiverId = acctCurrent.Id;
                ak.Comment = user.KudoComment;
                ak.Created = DateTime.Now;
                ak.CreatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                ak.LastUpdated = DateTime.Now;
                ak.LastUpdatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);

                db.AccountKudoes.Add(ak);
            }

            if (user.ConnectFrom > 0)
            {
                Communication comm = new Communication();
                comm.SenderId = user.ConnectFrom;
                comm.ReceiverId = user.ConnectTo;
                comm.CommMethodId = (int)CommType.Notification;
                comm.ActionId = (int)ActionType.ConnectRequest;
                comm.StatusId = (int)StatusType.New;
                comm.Msg = "Connection Request";
                comm.Created = DateTime.Now;
                comm.CreatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);
                comm.LastUpdated = DateTime.Now;
                comm.LastUpdatedBy = string.Format("{0} {1}", acctCurrent.Firstname, acctCurrent.Lastname);

                db.Communications.Add(comm);
                db.SaveChanges();
            }

            db.SaveChanges();

            Session["User"] = acctToUpdate;

            ViewBag.States = db.States.ToList();
            ViewBag.Countries = db.Countries.ToList();

            return View();
        }
    }

    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class SessionCheckAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            string controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName.ToLower();
            HttpSessionStateBase session = filterContext.HttpContext.Session;
            Account acctCurrent = (Account)session["User"];
            if (acctCurrent == null)
            {
                //Redirect
                var url = new UrlHelper(filterContext.RequestContext);
                var loginUrl = url.Content("~/account/login");
                filterContext.HttpContext.Response.Redirect(loginUrl, true);
            }

            //Reload Session user, to get any new updates
            else
            {
                KudotreeEntities db = new KudotreeEntities();
                HttpContext.Current.Session["User"] = db.Accounts.SingleOrDefault(a => a.Id == acctCurrent.Id);
            }
        }
    }

    public class ProfileUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string City { get; set; }
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public string Zipcode { get; set; }
        public int Gender { get; set; }
        public string DOB { get; set; }
        public string JobTitle { get; set; }
        public string Summary { get; set; }
        public bool BusinessOwner { get; set; }
        public bool BusinessOwnerKudoHelp { get; set; }
        public bool JobSeeker { get; set; }
        public bool JobSeekerKudoHelp { get; set; }
        public bool Student { get; set; }
        public bool StudentKudoHelp { get; set; }
        public HttpPostedFileBase ProfilePic { get; set; }
        public string BusinessName { get; set; }
        public string BusinessAddress1 { get; set; }
        public string BusinessAddress2 { get; set; }
        public string BusinessCity { get; set; }
        public int BusinessStateId { get; set; }
        public int BusinessCountryId { get; set; }
        public string BusinessZipcode { get; set; }
        public int BusinessId { get; set; }
        public string BusinessProduct { get; set; }
        public HttpPostedFileBase ResumeFile { get; set; }
        public string SkillName { get; set; }
        public int SkillProficiency { get; set; }
        public int SkillYearsUsed { get; set; }
        public string JobCompanyName { get; set; }
        public string JobCompanyAddress1 { get; set; }
        public string JobCompanyAddress2 { get; set; }
        public string JobCompanyCity { get; set; }
        public string JobCompanyZipcode { get; set; }
        public int JobCompanyStateId { get; set; }
        public int JobCompanyCountryId { get; set; }
        public string JobPosition { get; set; }
        public string JobDescription { get; set; }
        public DateTime JobFrom { get; set; }
        public DateTime JobTo { get; set; }
        public string SchoolName { get; set; }
        public string SchoolAddress1 { get; set; }
        public string SchoolAddress2 { get; set; }
        public string SchoolCity { get; set; }
        public string SchoolZipcode { get; set; }
        public int SchoolStateId { get; set; }
        public int SchoolCountryId { get; set; }
        public DateTime SchoolFrom { get; set; }
        public DateTime SchoolTo { get; set; }
        public string SchoolCertification { get; set; }
        public int ProfileAcctId { get; set; }
        public string KudoComment { get; set; }
        public int ConnectFrom { get; set; }
        public int ConnectTo { get; set; }
    }

    public class LoginUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SignUpUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
