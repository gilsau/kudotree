;/* module-key = 'com.atlassian.streams.actions:commentActionHandlers', location = '/js/inline-actions/comment.js' */
(function(){function a(h){var f=AJS.$(h.target).closest("div.activity-item"),g=f.find("form.activity-item-comment-form");h.preventDefault();if(!g.length){g=c(h,f);g.appendTo(f)}if(g.is(":visible")){g.slideUp(function(){g.trigger("contentResize.streams").removeClass("ready")})}else{g.slideDown(function(){g.find("textarea").focus();g.css({display:""});g.trigger("contentResize.streams").addClass("ready")})}}function c(k,h){var i,f,j,g;if(!k.data||!k.data.feedItem){ActivityStreams.InlineActions.statusMessage(h,"An unknown error occurred while submitting your comment.","error");return null}g=k.data.feedItem;i=AJS.$('<form class="activity-item-comment-form" method="post" action=""></form>').css({display:"none"});f=AJS.$("<fieldset></fieldset>").appendTo(i);AJS.$('<input type="hidden" name="replyTo">').val(g.links["http://streams.atlassian.com/syndication/reply-to"]).appendTo(f);AJS.$('<input type="hidden" name="xsrfToken">').val(window.top.AJS.$("#atlassian-token").attr("content")).appendTo(f);AJS.$('<textarea cols="40" rows="6" name="comment"></textarea>').appendTo(f);j=AJS.$('<div class="submit"></div>').appendTo(i);AJS.$('<button name="submit" type="submit"></button>').text("Add").appendTo(j);AJS.$('<a href="#" class="streams-cancel"></a>').text("Cancel").click(a).appendTo(j);i.submit(function(n){n.preventDefault();var l=AJS.$(n.target),m=AJS.$.trim(l.find("textarea").val());if(m.length===0){ActivityStreams.InlineActions.statusMessage(h,"Please enter a comment.","error");return}l.find("button").attr("disabled","true");AJS.$.ajax({type:"POST",url:ActivityStreams.getBaseUrl()+"/plugins/servlet/streamscomments",data:l.serialize(),dataType:"json",global:false,beforeSend:function(){l.trigger("beginInlineAction")},complete:function(){l.trigger("completeInlineAction")},success:function(e,p,o){a(n);l.find("button").removeAttr("disabled");l.find("textarea").val("");if(o.status==302){ActivityStreams.InlineActions.statusMessage(h,"An unknown error occurred while submitting your comment.","error")}else{ActivityStreams.InlineActions.statusMessage(h,"Successfully added comment.","info");l.trigger("issueCommented",g)}},error:function(o){var p=(o&&o.data)||o,e=(p&&p.responseText&&AJS.json.parse(p.responseText).subCode)||"streams.comment.action.error.invalid.comment";a(n);l.find("button").removeAttr("disabled");ActivityStreams.InlineActions.statusMessage(h,AJS.I18n.getText(e),"error")}})});return i}function d(f,e){if(!e.links["http://streams.atlassian.com/syndication/reply-to"]){return null}return AJS.$('<a href="#" class="activity-item-comment-link"></a>').text(f).bind("click",{feedItem:e},a)}function b(e){var f="Comment";if(e.application!=="com.atlassian.jira"&&e.type==="comment"){f="Reply"}return d(f,e)}ActivityStreams.registerAction("article comment page issue file job",b,1)})();;