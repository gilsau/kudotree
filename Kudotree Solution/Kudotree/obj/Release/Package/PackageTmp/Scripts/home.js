var imgLabelId = "ImagePostLabel";

$(document).ready(function () {

    //Camera icon clicked
    $('.btnCamera').on('click', function () {

        //Set global var for img label, to show file selected
        imgLabelId = $(this).attr('data-imglabel-id');

        //Trigger Open File dialog box
        $('#ImagePost').trigger('click');
    });

    //Show image selected
    $('#ImagePost').on('change', function () {
        var filename = $.trim($(this).val());
        if (filename != '') {
            var fileparts = filename.split('\\');

            //Use global var to show img selected
            $('#'+imgLabelId).html('<b>PHOTO: </b>' + fileparts[fileparts.length - 1]);
        }
    });

    //Filter list view
    $('#ListBy').on('change', function () {
        window.location = '/home?listby=' + $(this).val();
    });

    //Post Reply button click
    $('.btnSubmit').on('click', function () {
        var btn = $(this);
        var parentId = btn.attr('data-parent-id');
        var imgLabel = $('#' + btn.attr('data-imglabel-id'));
        var anchor = btn.attr('data-last-anchor-id');
        var comment = $('#Comment-' + parentId).val();
        var commentHdnFld = $('#Comment');
        var listby = $('#ListBy option:selected');
        var form = $('#frmKudoPost');

        //Show loading button
        btn.html('<img src="/images/loading.gif" style="height:30px;" />');

        //Set form vars
        $('#ParentAccountPostId').val(parentId);
        commentHdnFld.val(comment);

        //Modify action for form
        var action = "/home?listby=" + listby.val();
        if(anchor > 0) action += '#pos-' + anchor;
        
        //Submit form
        form.attr('action', action);
        form.submit();
    });

    //Textbox for Post / Reply (on focus)
    $('.txtPost').on('focus', function () {
        var box = $(this);
        var footer = $('#' + box.attr('data-footer-id'));

        box.attr('rows', '5');
        footer.show('fade');
    });

    //Close all comment boxes
    $(document).on('click', function (e) {
        var clickSource = $(e.target);
        var boxes = $('.txtPost');

        console.log('clickSource');
        console.log(clickSource);

        boxes.each(function () {
            var box = $(this);
            var footer = $('#' + box.attr('data-footer-id'));
            
            //Resize textbox and hide reply footer
            if (!clickSource.hasClass('btnSubmit') &&
                !clickSource.hasClass('txtPost') &&
                !clickSource.hasClass('selPrivacy') &&
                !clickSource.hasClass('btnCamera') &&
                !clickSource.hasClass('imgPost') &&
                !clickSource.hasClass('glyphicon-camera')) {
                    box.attr('rows', '1');
                    footer.hide('fade');
            }
        });
    });

    //Save Edit
    $('.btnCommentSave').on('click', function () {
        var btn = $(this);
        var editSection = $(this).parent();
        var viewSection = editSection.next();
        var commentBox = editSection.find('textarea');
        var comment = commentBox.val();
        var postId = btn.attr('data-post-id');
        
        console.log('comment');
        console.log(comment);

        console.log('post id');
        console.log(postId);

        //Show loading with delay
        btn.html('<img src="/images/loading.gif" style="height:30px;" />');
        setTimeout(function () {

            $.ajax({
                type: "POST",
                url: "/home/index",
                data: { Comment: comment, AccountPostId: postId }
            })
                .fail(function (response) {
                    console.log('fail');
                    console.log("response:");
                    console.log(response);
                })
                .done(function (response) {
                    
                    //Reset edit section
                    btn.html('Save');
                    editSection.collapse('hide');

                    //Show updated comment
                    viewSection.html(comment.replace('\r\n', '<br/>'));
                    viewSection.collapse('show');

                    //console.log("success");
                    //console.log(response);
                    //console.log("response.statusText: " + response.statusText);
                    //console.log("response.responseText: " + response.responseText);
                });

        }, 1000);
    });
});