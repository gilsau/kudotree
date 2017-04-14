$(document).ready(function () {

    //Popover for profile links
    $('[data-toggle="profilepopover"]').popover({
        viewport: '#viewport',
        trigger: 'manual',
        html: true,
        content: function () {

            var acctId = $(this).attr('data-acct-id');
            var pic = $(this).attr('data-pic');
            var name = $(this).attr('data-name');
            var jobTitle = $(this).attr('data-job');
            var location = $(this).attr('data-location');

            var htmlstr = '<div>';
            htmlstr += "<div style='display:inline-block;vertical-align:top;padding:5px;'><a href='../account/profile?id=" + acctId + "'><img src='../profilepics/" + pic + "' style='height:50px;' /></a></div>";
            htmlstr += "<div style='display:inline-block;vertical-align:top;padding:5px;white-space:nowrap;'>";
            htmlstr += "<div><b>" + name + "</b></div>";
            htmlstr += "<div><small><b>" + jobTitle + "</b></small></div>";
            htmlstr += "<div><small><b>" + location + "</b></small></div>";
            htmlstr += "</div>";
            htmlstr += '<div style="margin-top:20px;">';
            htmlstr += '<a href="#kudoModal" data-id="' + acctId + '" data-toggle="modal" data-name="' + name + '" class="btnKudos btn btn-sm btn-primary"><span class="glyphicon glyphicon-leaf"></span>&nbsp;&nbsp;<small>Give Kudos</small></a>';
            htmlstr += '<a data-to-id="' + acctId + '" class="btnConnect btn btn-sm btn-primary"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;<small>Connect</small></a>';
            htmlstr += '<a href="#msgModal" data-toggle="modal" data-to-id="' + acctId + '" data-to-name="' + name + '" class="btnMsg btn btn-sm btn-primary"><span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;<small>Message</small></a>';
            htmlstr += '<a href="#prefModal" data-id="' + acctId + '" data-toggle="modal" data-name="' + name + '" class="btnAddToPrefNet btn btn-sm btn-primary"><span class="glyphicon glyphicon-star"></span>&nbsp;&nbsp;<small>Prefer</small></a>';
            htmlstr += "</div>";
            htmlstr += "</div>";

            return htmlstr;
        }
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(this).siblings(".popover").on("mouseleave", function () {
            console.log('here');
            $(_this).popover('hide');
        });

    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 100);
    });
    


});