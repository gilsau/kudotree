$(document).ready(function () {

    //Camera is clicked
    $('#profile-camera-icon').click(function () {
        $('#ProfilePic').trigger('click');
    });

    //Display filename
    $('#ProfilePic').change(function () {
        var arrFile = $(this).val().split('\\');
        $('#profile-camera-filename').text(arrFile[arrFile.length-1]);
    });
    
    //Resume file icon is clicked
    $('#resume-file-icon').click(function () {
        $('#ResumeFile').trigger('click');
    });

    //Display filename
    $('#ResumeFile').change(function () {
        var arrFile = $(this).val().split('\\');
        $('#resume-filename').text(arrFile[arrFile.length - 1]);
    });

    //Business click
    $('#chkRoleBus').click(function () {
        toggleRoleCheckbox(this, $('#chkBusinessOwnerKudoHelp'));
    });

    //Job Seeker click
    $('#chkRoleJob').click(function () {
        toggleRoleCheckbox(this, $('#chkJobSeekerKudoHelp'));
    });

    //Student click
    $('#chkRoleStudent').click(function () {
        toggleRoleCheckbox(this, $('#chkStudentKudoHelp'));
    });

    //Profile form submitted (top section of page)
    $('#frmProfile').on('submit', function (e) {
        if (!ValidateProfileForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmProfile').hide();
            $('#alertFrmProfile').hide();
            $('#loadingFrmProfile').show();
        }
    });

    //Professional Objective form submitted
    $('#frmProfObj').on('submit', function (e) {
        if (!ValidateProfObjForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmProfObj').hide();
            $('#alertFrmProfObj').hide();
            $('#loadingFrmProfObj').show();
        }
    });

    //Job Seeker form submitted
    $('#frmJobSeeker').on('submit', function (e) {
        $('#msgFrmJobSeeker').hide();
        $('#alertFrmJobSeeker').hide();
        $('#loadingFrmJobSeeker').show();
    });

    //Student form submitted
    $('#frmStudent').on('submit', function (e) {
        $('#msgFrmStudent').hide();
        $('#alertFrmStudent').hide();
        $('#loadingFrmStudent').show();
    });

    //Business Owner form submitted
    $('#frmBusiness').on('submit', function (e) {
        $('#msgFrmBusiness').hide();
        $('#alertFrmBusiness').hide();
        $('#loadingFrmBusiness').show();
    });

    //Add Business btn click
    $('#frmBusinessList').on('submit', function (e) {
        $('#msgFrmBusinessList').hide();
        $('#alertFrmBusinessList').hide();

        if (!ValidateAddBusiness()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmBusinessList').hide();
            $('#alertFrmBusinessList').hide();
            $('#loadingFrmBusinessList').show();
        }
    });

    //Resume form submitted
    $('#frmResume').on('submit', function (e) {
        $('#msgFrmResume').hide();
        $('#alertFrmResume').hide();

        if (!ValidateResumeForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmResume').hide();
            $('#alertFrmResume').hide();
            $('#loadingFrmResume').show();
        }
    });

    //Skills form submitted
    $('#frmSkills').on('submit', function (e) {
        $('#msgFrmSkills').hide();
        $('#alertFrmSkills').hide();
        
        if (!ValidateSkillsForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmSkills').hide();
            $('#alertFrmSkills').hide();
            $('#loadingFrmSkills').show();
        }
    });

    //Experience form submitted
    $('#frmExperience').on('submit', function (e) {
        $('#msgFrmExperience').hide();
        $('#alertFrmExperience').hide();
        
        if (!ValidateExperienceForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmExperience').hide();
            $('#alertFrmExperience').hide();
            $('#loadingFrmExperience').show();
        }
    });

    //Education form submitted
    $('#frmEducation').on('submit', function (e) {
        $('#msgFrmEducation').hide();
        $('#alertFrmEducation').hide();

        if (!ValidateEducationForm(this)) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $('#msgFrmEducation').hide();
            $('#alertFrmEducation').hide();
            $('#loadingFrmEducation').show();
        }
    });

    //Save Msg from server-side
    var panel = GetUrlParam('panel');
    var panel2 = GetUrlParam('panel2');

    if (panel2 != undefined) {
        $('#' + panel2).show();
    }
    else {
        $('#msgFrm' + panel).show();
    }

    //Remove Buttons
    $('.removeBtn').on('click', function () {
        $(this).html('<img src="/images/loading.gif" style="height:30px;" />');
    });

    //Anchor link
    var anchor = GetUrlParam('a');
    if(anchor != undefined){
        location = '#' + anchor;
    }

    //Prefer button
    $('#btnPrefer').on('click', function () {

    });

    //Professional Objective Modal load
    $('#modalProfObj').on('shown.bs.modal', function () {
        $('#JobTitle').focus();
    });

    //Add Skills Modal load
    $('#modalSkills').on('shown.bs.modal', function () {
        $('#SkillName').focus();
    });

    //Add Experience Modal load
    $('#modalExperience').on('shown.bs.modal', function () {
        $('#JobCompanyName').focus();
    });

    //Add Education Modal load
    $('#modalEducation').on('shown.bs.modal', function () {
        $('#SchoolName').focus();
    });

    //Add Business Location Modal load
    $('#modalBusinessList').on('shown.bs.modal', function () {
        $('#BusinessName').focus();
    });

});


function toggleRoleCheckbox(chk1, chk2) {

    if ($(chk1).is(':checked')) {
        chk2.prop('disabled', false);
        chk2.prop('checked', true);
    }
    else {
        chk2.prop('disabled', true);
        chk2.prop('checked', false);
    }
}

function ValidateEducationForm() {
    var schoolName = $('#SchoolName');
    var schoolAddress1 = $('#SchoolAddress1');
    var schoolCity = $('#SchoolCity');
    var schoolStateId = $('#SchoolStateId option:selected');
    var schoolCountryId = $('#SchoolCountryId option:selected');
    var schoolFrom = $('#SchoolFrom');
    var schoolTo = $('#SchoolTo');
    var schoolCert = $('#SchoolCertification');

    var alert = $('#alertFrmEducation');
    var errMsg = '';
    var focusObj = schoolName;

    if ($.trim(schoolName.val()) == '') {
        focusObj = schoolName;
        errMsg = 'Please provide a school name.';
    }
    else if ($.trim(schoolAddress1.val()) == '') {
        focusObj = schoolAddress1;
        errMsg = 'Please provide school address.';
    }
    else if ($.trim(schoolCity.val()) == '') {
        focusObj = schoolCity;
        errMsg = 'Please provide school city.';
    }
    else if (schoolStateId.val() == 0) {
        focusObj = schoolStateId;
        errMsg = 'Please select school state.';
    }
    else if (schoolCountryId.val() == 0) {
        focusObj = schoolCountryId;
        errMsg = 'Please select school country.';
    }
    else if ($.trim(schoolFrom.val()) == '') {
        focusObj = schoolFrom;
        errMsg = 'Please provide starting date.';
    }
    else if ($.trim(schoolTo.val()) == '') {
        focusObj = schoolTo;
        errMsg = 'Please provide ending date.';
    }
    else if ($.trim(schoolCert.val()) == '') {
        focusObj = schoolCert;
        errMsg = 'Please provide certification.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

function ValidateExperienceForm() {
    var jobCompanyName = $('#JobCompanyName');
    var jobCompanyAddress1 = $('#JobCompanyAddress1');
    var jobCompanyCity = $('#JobCompanyCity');
    var jobCompanyStateId = $('#JobCompanyStateId option:selected');
    var jobCompanyCountryId = $('#JobCompanyCountryId option:selected');
    var jobPosition = $('#JobPosition');
    var jobDescription = $('#JobDescription');
    var jobFrom = $('#JobFrom');
    var jobTo = $('#JobTo');

    var alert = $('#alertFrmExperience');
    var errMsg = '';
    var focusObj = jobCompanyName;
    
    if ($.trim(jobCompanyName.val()) == '') {
        focusObj = jobCompanyName;
        errMsg = 'Please provide a company name.';
    }
    else if ($.trim(jobCompanyAddress1.val()) == '') {
        focusObj = jobCompanyAddress1;
        errMsg = 'Please provide company address.';
    }
    else if ($.trim(jobCompanyCity.val()) == '') {
        focusObj = jobCompanyCity;
        errMsg = 'Please provide company city.';
    }
    else if (jobCompanyStateId.val() == 0) {
        focusObj = jobCompanyStateId;
        errMsg = 'Please select company state.';
    }
    else if (jobCompanyCountryId.val() == 0) {
        focusObj = jobCompanyCountryId;
        errMsg = 'Please select company country.';
    }
    else if ($.trim(jobPosition.val()) == '') {
        focusObj = jobPosition;
        errMsg = 'Please provide job position.';
    }
    else if ($.trim(jobFrom.val()) == '') {
        focusObj = jobFrom;
        errMsg = 'Please provide starting date.';
    }
    else if ($.trim(jobTo.val()) == '') {
        focusObj = jobTo;
        errMsg = 'Please provide ending date.';
    }
    else if ($.trim(jobDescription.val()) == '') {
        focusObj = jobDescription;
        errMsg = 'Please provide job description.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

function ValidateSkillsForm() {
    var skill = $('#SkillName');
    var prof = $('#SkillProficiency');
    var yrs = $('#SkillYearsUsed');

    var alert = $('#alertFrmSkills');
    var errMsg = '';
    var focusObj = skill;
    
    console.log(skill);

    if ($.trim(skill.val()) == '') {
        focusObj = skill;
        errMsg = 'Please provide a skill/interest.';
    }
    else if ($.trim(prof.val()) == '') {
        focusObj = prof;
        errMsg = 'Please provide proficiency.';
    }
    else if ($.trim(yrs.val()) == '') {
        focusObj = yrs;
        errMsg = 'Please provide number of years used.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

function ValidateResumeForm() {
    var resume = $('#ResumeFile');

    var alert = $('#alertFrmResume');
    var errMsg = '';
    var ext = resume.val().substr(resume.val().lastIndexOf('.') + 1).toLowerCase();

    if (resume.val() == '') {
        errMsg = 'Please select a file.';
    }
    else if(ext != 'pdf'){
        errMsg = 'File must be in PDF format.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        return false;
    }

    return true;
}

function ValidateAddBusiness() {
    var busName = $('#BusinessName');
    var busAddy1 = $('#BusinessAddress1');
    var busCity = $('#BusinessCity');
    var busState = $('#BusinessStateId option:selected');
    var busCntry = $('#BusinessCountryId option:selected');
    var busProd = $('#BusinessProduct');

    var alert = $('#alertFrmBusinessList');
    var errMsg = '';
    var focusObj = busName;

    console.log('busProd: ' + busProd.val());

    //Business Name
    if ($.trim(busName.val()) == '') {
        focusObj = busName;
        errMsg = 'Please provide a business name.';
    }

    //Business Address1
    else if ($.trim(busAddy1.val()) == '') {
        focusObj = busAddy1;
        errMsg = 'Please provide an address.';
    }

    //Business City
    else if ($.trim(busCity.val()) == '') {
        focusObj = busCity;
        errMsg = 'Please provide a city.';
    }

    //Business State
    else if (busState.val() == '0') {
        focusObj = busState;
        errMsg = 'Please select a state.';
    }

    //Business Country
    else if (busCntry.val() == '0') {
        focusObj = busCntry;
        errMsg = 'Please select a country.';
    }

    //Business Products
    else if ($.trim(busProd.val()) == '') {
        focusObj = busProd;
        errMsg = 'Please provide a product or service.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

function ValidateProfObjForm(frm) {
    var title = $('#JobTitle');
    var summary = $('#Summary');
    var alert = $('#alertFrmProfObj');
    var errMsg = '';
    var focusObj = title;

    //Job Title
    if ($.trim(title.val()) == '') {
        focusObj = title;
        errMsg = 'Please provide job title.';
    }

        //Summary
    else if ($.trim(summary.val()) == '') {
        focusObj = summary;
        errMsg = 'Please provide summary.';
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

function ValidateProfileForm(frm) {
    var first = $('#Firstname');
    var last = $('#Lastname');
    var pass = $('#Password');
    var pass2 = $('#Password2');
    var alert = $('#alertFrmProfile');
    var errMsg = '';
    var focusObj = first;
    
    //Firstname
    if ($.trim(first.val()) == '') {
        focusObj = first;
        errMsg = 'Please provide firstname.';
    }

    //Lastname
    else if ($.trim(last.val()) == '') {
        focusObj = last;
        errMsg = 'Please provide lastname.';
    }

    //Check Passwords
    else if ($.trim(pass.val()) != '') {
        if (pass.val() != pass2.val()) {
            focusObj = pass;
            errMsg = 'Passwords do not match.';
            pass.val('');
            pass2.val('');
        }
    }

    //There's an error
    if (errMsg != '') {
        alert.html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + errMsg);
        alert.show('fade');
        focusObj.focus();
        return false;
    }

    return true;
}

