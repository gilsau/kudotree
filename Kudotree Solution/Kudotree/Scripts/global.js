//Window vars
var win = $(window);
var mainPanel = $('#mainPanel');
var leftPanel = $('#leftPanel');
var rightPanel = $('#rightPanel');

//Message/Notification vars
var msgsDropdown = $('#ulMsgs');
var notesDropdown = $('#ulNotes');

//Status vars
var statusElements = [];
var statusUserIds = [];

//Timers, 1000 = 1 sec
var intCheckForNewNotesForLeftPanel = 5000;     //New Notifications
var intCheckForNewMsgsForLeftPanel = 5000;      //New Messages
var intUpdateStatuses = 60000;                  //Users' Status
var intCheckForNewConvoMsgs = 5000;             //New Messages in Conversation, on Messages Page

var showTooltip = null;
var changeTooltipPosition = null;
var hideTooltip = null;

//Remove something, use this var to hold name of function to call IF ok button is clicked
var ConfirmOkDelegate = null;

$(document).ready(function () {

    //Set background color and show footer
    $('body').addClass('silverGradient');
    $('#footer').css('visibility', 'visible');
    
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    //Event handler for Search Dropdown
    $('.dropdownSearchOption').click(function(){
        var glyphClass = $(this).attr('data-glyphicon');

        $('#dropdownSearchDownArrow').removeClass();
        $('#dropdownSearchDownArrow').addClass('dropdown-toggle').addClass('glyphicon').addClass(glyphClass);
    });

    //Request box, allow clicking in form
    $('#requestBox').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    //Send Message Modal
    $('.btnMsg').on('click', function () {
        $('#MessageToAcctId').val($(this).attr('data-to-id'));
        $('#msg-person-name').text($(this).attr('data-to-name'));
    });

    //Send Message Modal load
    $('#msgModal').on('shown.bs.modal', function () {
        $('#MessageTo').focus();
    });

    //Send Message button
    $('#frmMsg').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        SendMessage();
    });

    //Create timer for new conversation messages
    CheckForNewMsgsForLeftPanel();
    setInterval(CheckForNewMsgsForLeftPanel, intCheckForNewMsgsForLeftPanel);

    //Create timer for new notifications
    CheckForNewNotesForLeftPanel();
    setInterval(CheckForNewNotesForLeftPanel, intCheckForNewNotesForLeftPanel);

    //Add status elements
    //statusElements.push({ ElemId: $('#status-current-user').attr('id'), UserId: $('#status-current-user').attr('data-id') });
    //statusUserIds.push($('#status-current-user').attr('data-id'));

    //Pop-overs
    $('[data-toggle="popover"]').popover({ trigger: 'hover' });

    //Keep dropdown open
    $('.keep-open').on('click', function (e) {
        e.stopPropagation();
    });

    //Give Kudos button
    $('.btnKudos').click(function () {
        $('#KudoToAcctId').val($(this).attr('data-id'));
        $('#kudoNameLabel').text($(this).attr('data-name'));
    });

    //Give Kudos Modal load
    $('#kudoModal').on('shown.bs.modal', function () {
        $('#KudoComment').focus();
    });

    //Give Kudos button
    $('#frmKudo').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        GiveKudos();
    });

    //Connect button
    $('.btnConnect').on('click', function () {
        var to = $(this).attr('data-to-id');
        ConnectRequest(this, to);
    });

    //Remove Confirmation box, OK button was clicked
    $('#btnConfirmOK').on('click', function () {
        $(this).html('<img src="/images/loading.gif" style="height:30px;" />');
        ConfirmOkDelegate();
    });

    //Add To Preferred Network
    $('.btnAddToPrefNet').on('click', function () {
        $('#ktIdForPrefNets').val($(this).attr('data-id'));
        $('#spanAddToPrefNetworkTitle').text($(this).attr('data-name'));

        var networks = $(this).attr('data-networks');

        $('input[name="ArrRegNets"]').each(function (index, item) {
            var val = $(item).val();

            if (networks.indexOf(val) > -1) {
                $(this).prop('checked', true);
            }
            else {
                $(this).prop('checked', false);
            }
        });
    });

    //Create Network button click
    $('#btnAddToPrefNetSave').on('click', function () {
        $(this).html('<img src="/images/loading.gif" style="height:30px;" />');
        AddToPreferNetwork();
    });

});

//Create timer for new messages
function CheckForNewMsgsForLeftPanel() {
    var msgsList = $('#ulMsgs');
    var msgCount = $('#msgCount');
    var msgCounter = 0;

    if (!msgsList.is(':visible')) {

        //Run ajax
        $.ajax({
            type: "POST",
            url: "/messages/get",
            data: { leftPanel: true, conversationId: 0, msgType: 1, newMessages: true }
        })
        .fail(function (response) {

            //console.log('FAIL');
            //console.log(response.responseText);

        })
        .done(function (response) {
            msgsList.empty();
            msgsList.html(response);
            msgCount.show();

            //Subtract dividers in html
            msgCounter = ($(response).filter('li').length - 1) / 2;
            msgCounter = msgCounter < 0 ? 0 : msgCounter;
            msgCount.text(msgCounter);
        });
    }
}

//Create timer for new notifications
function CheckForNewNotesForLeftPanel() {
    var notesList = $('#ulNotes');
    var noteCount = $('#noteCount');
    var noteCounter = 0;

    if (!notesList.is(':visible')) {

        //Run ajax
        $.ajax({
            type: "POST",
            url: "/messages/get",
            data: { leftPanel: true, conversationId: 0, msgType: 2, newMessages: true }
        })
        .fail(function (response) {

            console.log('FAIL');
            console.log(response.responseText);

        })
        .done(function (response) {
            notesList.empty();
            notesList.html(response);
            noteCount.show();

            //Subtract dividers in html
            noteCounter = ($(response).filter('li').length - 1) / 2;
            noteCounter = noteCounter < 0 ? 0 : noteCounter;
            noteCount.text(noteCounter);
        });
    }
}

//Update Status for all friends of this user
function UpdateStatuses() {
    //console.log('*****************************************************');
    //console.log(statusUserIds);

    //Run ajax
    $.ajax({
        type: "POST",
        url: "/account/getstatus",
        data: { users: statusUserIds.toString() }
    })
    .fail(function (response) {
        //console.log(response.responseText);
    })
    .done(function (response) {

        //console.log('********* SUCCESS, RESPONSE *************');
        //console.log(response);

        var accountStatuses = response;
        var intCounter = 0;
        //Loop thru elements and update their status
        for (var se in statusElements) {
            intCounter++;

            var elem = $('#' + statusElements[se].ElemId);
            var userId = statusElements[se].UserId;

            //Look for current user's status
            var statusColor = 'gray';
            var statusText = 'Offline';
            for (var as in accountStatuses) {
                if (accountStatuses[as].AccountId == userId) {
                    statusColor = accountStatuses[as].StatusColor;
                    statusText = accountStatuses[as].StatusText;
                    break;
                }
            }

            //Redirect to login page, if user is timedout
            if (intCounter == 1 && statusText == 'Offline') {
                window.location = '../account/login';
            }

            //console.log('********** Element being updated *************');
            //console.log(elem);

            elem.css('color', statusColor);
            elem.text(statusText);
        }

        //console.log('******************** Success!\r\n');
        //console.log(response);
    });
}

function SendMessage(){
    var msgTo = $('#MessageTo').val();
    var msgToAcctId = $('#MessageToAcctId').val();

    $('.btnSendMsg').html('<img src="/images/loading.gif" style="height:30px;" />');

    console.log('msgTo');
    console.log(msgTo);


    //Show dialog with delay
    setTimeout(function () {

        $.ajax({
            type: "POST",
            url: "/messages/sendmessage",
            data: { Msg: msgTo, MessageToAcctId: msgToAcctId }
        })
            .fail(function (response) {
                console.log('fail');
                console.log("response.messageForLog: " + response.messageForLog);
                console.log("response.responseText: " + response.responseText);
            })
            .done(function (response) {
                //Reset modal
                $('#msgModal').modal('hide');
                $('#MessageTo').val('');
                $('.btnSendMsg').html('Send');

                //Success msg
                $('#okMsg').text('Message was sent successfully');
                $('#modalOk').modal('show');

                //console.log("success");
                //console.log(response);
                //console.log("response.statusText: " + response.statusText);
                //console.log("response.responseText: " + response.responseText);
            });

    }, 3000);
}

function ConnectRequest(btn, to) {

    //Show loading gif
    $(btn).html('<img src="/images/loading.gif" style="height:30px;" />');

    //Show dialog with delay
    setTimeout(function () {

        $.ajax({
            type: "POST",
            url: "/connections/connrequest",
            data: { ToId: to }
        })
            .fail(function (response) {
                console.log('fail');
                console.log("response.messageForLog: " + response.messageForLog);
                console.log("response.responseText: " + response.responseText);
            })
            .done(function (response) {
                console.log("success");
                console.log(response);

                $(btn).html('Connection Requested');
                $(btn).attr('disabled', true);

                //console.log("response.statusText: " + response.statusText);
                //console.log("response.responseText: " + response.responseText);
            });

    }, 3000);
}

function GiveKudos() {
    var kudoToComm = $('#KudoComment');
    var kudoToAcctId = $('#KudoToAcctId');

    $('#btnSendKudo').html('<img src="/images/loading.gif" style="height:30px;" />');

    //Show dialog with delay
    setTimeout(function () {

        $.ajax({
            type: "POST",
            url: "/messages/sendkudos",
            data: { KudoComment: kudoToComm.val(), KudoToAcctId: kudoToAcctId.val() }
        })
            .fail(function (response) {
                console.log('fail');
                console.log("response.messageForLog: " + response.messageForLog);
                console.log("response.responseText: " + response.responseText);
            })
            .done(function (response) {
                //Reset modal
                $('#kudoModal').modal('hide');
                $('#KudoComment').val('');
                $('.btnSendKudo').html('Send');

                //Success msg
                $('#okMsg').text('Kudos were sent successfully');
                $('#modalOk').modal('show');

                //console.log("success");
                //console.log(response);
                //console.log("response.statusText: " + response.statusText);
                //console.log("response.responseText: " + response.responseText);
            });

    }, 3000);
}

function AddToPreferNetwork() {
    var connId = 0;
    var prefNets = [];

    $('#btnSendKudo').html('<img src="/images/loading.gif" style="height:30px;" />');

    //Show dialog with delay
    setTimeout(function () {

        $.ajax({
            type: "POST",
            url: "/kudotree/addtoprefnet",
            data: { ConnIdToAddToPrefNet: connId, ArrPrefNets: prefNets }
        })
            .fail(function (response) {
                console.log('fail');
                console.log("response.messageForLog: " + response.messageForLog);
                console.log("response.responseText: " + response.responseText);
            })
            .done(function (response) {

                //Reset modal
                $('#prefModal').modal('hide');
                $('#KudoComment').val('');
                $('.btnSendKudo').html('Send');

                //Success msg
                $('#okMsg').text('Kudos were sent successfully');
                $('#modalOk').modal('show');

                //console.log("success");
                //console.log(response);
                //console.log("response.statusText: " + response.statusText);
                //console.log("response.responseText: " + response.responseText);
            });

    }, 3000);
}


function GetUrlParam(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}