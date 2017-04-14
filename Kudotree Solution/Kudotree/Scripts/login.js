$(document).ready(function () {

    //Forgot Password link
    $('.forgotpassword').click(function () {
        $('#modalForgotPass').modal('show');
    });

    //Get Password button
    $('#btnGetPassword').click(function(){
        var email = $('#emailForgotPass').val();

        $('#procMsg').text('Sending password via email, please wait...');
        $('#modalProcessing').modal('show');

        //Show dialog for at least 3 seconds
        setTimeout(function () {

            //Run ajax
            $.ajax({
                type: "POST",
                url: "/account/sendpassword",
                data: { Email: email }
            })
            .fail(function (response) {
                console.log('fail');
                console.log("response.statusText: " + response.statusText);
                console.log("response.responseText: " + response.responseText);
            })
            .done(function (response) {
                
                if (response == "ok") {
                    $('#modalProcessing').modal('hide');
                    $('#okMsg').text('A new password has been emailed to the email address provided.');
                    $('#modalOk').modal('show');
                }
                else {
                    $('#modalProcessing').modal('hide');
                    $('#divWarn div').text(response);
                    $('#divWarn').show();
                }
            });

        }, 3000);
    });

    $('#Email').focus();
});