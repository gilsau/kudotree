;/* module-key = 'com.atlassian.auiplugin:dialog', location = 'js/dialog.js' */
AJS.popup=function(I){var D={width:800,height:600,closeOnOutsideClick:false,keypressListener:function(J){if(J.keyCode===27&&B.is(":visible")){F.hide()}}};if(typeof I!="object"){I={width:arguments[0],height:arguments[1],id:arguments[2]};I=AJS.$.extend({},I,arguments[3])}I=AJS.$.extend({},D,I);var B=AJS("div").addClass("aui-popup");if(I.id){B.attr("id",I.id)}var E=3000;AJS.$(".aui-dialog").each(function(){var J=AJS.$(this);E=(J.css("z-index")>E)?J.css("z-index"):E});var G=(function(K,J){I.width=(K=(K||I.width));I.height=(J=(J||I.height));B.css({marginTop:-Math.round(J/2)+"px",marginLeft:-Math.round(K/2)+"px",width:K,height:J,"z-index":parseInt(E,10)+2});return arguments.callee})(I.width,I.height);AJS.$("body").append(B);B.hide();AJS.enable(B);var C=AJS.$(".aui-blanket"),A=function(J,K){var L=AJS.$(J,K);if(L.length){L.focus();return true}return false},H=function(J){if(AJS.$(".dialog-page-body",J).find(":focus").length!==0){return }if(I.focusSelector){return A(I.focusSelector,J)}var K=":input:visible:enabled:first";if(A(K,AJS.$(".dialog-page-body",J))){return }if(A(K,AJS.$(".dialog-button-panel",J))){return }A(K,AJS.$(".dialog-page-menu",J))};var F={changeSize:function(J,K){if((J&&J!=I.width)||(K&&K!=I.height)){G(J,K)}this.show()},show:function(){var J=function(){AJS.$(document).off("keydown",I.keypressListener).on("keydown",I.keypressListener);AJS.dim();C=AJS.$(".aui-blanket");if(C.size()!=0&&I.closeOnOutsideClick){C.click(function(){if(B.is(":visible")){F.hide()}})}B.show();AJS.popup.current=this;H(B);AJS.$(document).trigger("showLayer",["popup",this])};J.call(this);this.show=J},hide:function(){AJS.$(document).unbind("keydown",I.keypressListener);C.unbind();this.element.hide();if(AJS.$(".aui-dialog:visible").size()==0){AJS.undim()}var J=document.activeElement;if(this.element.has(J).length){J.blur()}AJS.$(document).trigger("hideLayer",["popup",this]);AJS.popup.current=null;this.enable()},element:B,remove:function(){B.remove();this.element=null},disable:function(){if(!this.disabled){this.popupBlanket=AJS.$("<div class='dialog-blanket'> </div>").css({height:B.height(),width:B.width()});B.append(this.popupBlanket);this.disabled=true}},enable:function(){if(this.disabled){this.disabled=false;this.popupBlanket.remove();this.popupBlanket=null}}};return F};(function(){function F(N,L,K,M){if(!N.buttonpanel){N.addButtonPanel()}this.page=N;this.onclick=K;this._onclick=function(O){return K.call(this,N.dialog,N,O)===true};this.item=AJS("button",L).addClass("button-panel-button");if(M){this.item.addClass(M)}if(typeof K=="function"){this.item.click(this._onclick)}N.buttonpanel.append(this.item);this.id=N.button.length;N.button[this.id]=this}function A(O,M,L,N,K){if(!O.buttonpanel){O.addButtonPanel()}if(!K){K="#"}this.page=O;this.onclick=L;this._onclick=function(P){return L.call(this,O.dialog,O,P)===true};this.item=AJS("a",M).attr("href",K).addClass("button-panel-link");if(N){this.item.addClass(N)}if(typeof L=="function"){this.item.click(this._onclick)}O.buttonpanel.append(this.item);this.id=O.button.length;O.button[this.id]=this}function B(M,L){var K=M=="left"?-1:1;return function(Q){var O=this.page[L];if(this.id!=((K==1)?O.length-1:0)){K*=(Q||1);O[this.id+K].item[(K<0?"before":"after")](this.item);O.splice(this.id,1);O.splice(this.id+K,0,this);for(var N=0,P=O.length;N<P;N++){if(L=="panel"&&this.page.curtab==O[N].id){this.page.curtab=N}O[N].id=N}}return this}}function G(K){return function(){this.page[K].splice(this.id,1);for(var L=0,M=this.page[K].length;L<M;L++){this.page[K][L].id=L}this.item.remove()}}F.prototype.moveUp=F.prototype.moveLeft=B("left","button");F.prototype.moveDown=F.prototype.moveRight=B("right","button");F.prototype.remove=G("button");F.prototype.html=function(K){return this.item.html(K)};F.prototype.onclick=function(K){if(typeof K=="undefined"){return this.onclick}else{this.item.unbind("click",this._onclick);this._onclick=function(L){return K.call(this,page.dialog,page,L)===true};if(typeof K=="function"){this.item.click(this._onclick)}}};var D=20;var H=function(Q,R,K,P,N){if(!(K instanceof AJS.$)){K=AJS.$(K)}this.dialog=Q.dialog;this.page=Q;this.id=Q.panel.length;this.button=AJS("button").html(R).addClass("item-button");if(N){this.button[0].id=N}this.item=AJS("li").append(this.button).addClass("page-menu-item");this.body=AJS("div").append(K).addClass("dialog-panel-body").css("height",Q.dialog.height+"px");this.padding=D;if(P){this.body.addClass(P)}var M=Q.panel.length,O=this;Q.menu.append(this.item);Q.body.append(this.body);Q.panel[M]=this;var L=function(){var S;if(Q.curtab+1){S=Q.panel[Q.curtab];S.body.hide();S.item.removeClass("selected");(typeof S.onblur=="function")&&S.onblur()}Q.curtab=O.id;O.body.show();O.item.addClass("selected");(typeof O.onselect=="function")&&O.onselect();(typeof Q.ontabchange=="function")&&Q.ontabchange(O,S)};if(!this.button.click){AJS.log("atlassian-dialog:Panel:constructor - this.button.click false");this.button.onclick=L}else{this.button.click(L)}L();if(M==0){Q.menu.css("display","none")}else{Q.menu.show()}};H.prototype.select=function(){this.button.click()};H.prototype.moveUp=H.prototype.moveLeft=B("left","panel");H.prototype.moveDown=H.prototype.moveRight=B("right","panel");H.prototype.remove=G("panel");H.prototype.html=function(K){if(K){this.body.html(K);return this}else{return this.body.html()}};H.prototype.setPadding=function(K){if(!isNaN(+K)){this.body.css("padding",+K);this.padding=+K;this.page.recalcSize()}return this};var E=56;var C=51;var I=50;var J=function(K,L){this.dialog=K;this.id=K.page.length;this.element=AJS("div").addClass("dialog-components");this.body=AJS("div").addClass("dialog-page-body");this.menu=AJS("ul").addClass("dialog-page-menu").css("height",K.height+"px");this.body.append(this.menu);this.curtab;this.panel=[];this.button=[];if(L){this.body.addClass(L)}K.popup.element.append(this.element.append(this.menu).append(this.body));K.page[K.page.length]=this};J.prototype.recalcSize=function(){var K=this.header?E:0;var N=this.buttonpanel?C:0;for(var M=this.panel.length;M--;){var L=this.dialog.height-K-N;this.panel[M].body.css("height",L);this.menu.css("height",L)}};J.prototype.addButtonPanel=function(){this.buttonpanel=AJS("div").addClass("dialog-button-panel");this.element.append(this.buttonpanel)};J.prototype.addPanel=function(N,K,M,L){new H(this,N,K,M,L);this.recalcSize();return this};J.prototype.addHeader=function(L,K){if(this.header){this.header.remove()}this.header=AJS("h2").text(L||"").addClass("dialog-title");K&&this.header.addClass(K);this.element.prepend(this.header);this.recalcSize();return this};J.prototype.addButton=function(L,K,M){new F(this,L,K,M);this.recalcSize();return this};J.prototype.addLink=function(M,L,N,K){new A(this,M,L,N,K);this.recalcSize();return this};J.prototype.gotoPanel=function(K){this.panel[K.id||K].select()};J.prototype.getCurrentPanel=function(){return this.panel[this.curtab]};J.prototype.hide=function(){this.element.hide()};J.prototype.show=function(){this.element.show()};J.prototype.remove=function(){this.element.remove()};AJS.Dialog=function(M,K,N){var L={};if(!+M){L=Object(M);M=L.width;K=L.height;N=L.id}this.height=K||480;this.width=M||640;this.id=N;L=AJS.$.extend({},L,{width:this.width,height:this.height,id:this.id});this.popup=AJS.popup(L);this.popup.element.addClass("aui-dialog");this.page=[];this.curpage=0;new J(this)};AJS.Dialog.prototype.addHeader=function(L,K){this.page[this.curpage].addHeader(L,K);return this};AJS.Dialog.prototype.addButton=function(L,K,M){this.page[this.curpage].addButton(L,K,M);return this};AJS.Dialog.prototype.addLink=function(M,L,N,K){this.page[this.curpage].addLink(M,L,N,K);return this};AJS.Dialog.prototype.addSubmit=function(L,K){this.page[this.curpage].addButton(L,K,"button-panel-submit-button");return this};AJS.Dialog.prototype.addCancel=function(L,K){this.page[this.curpage].addLink(L,K,"button-panel-cancel-link");return this};AJS.Dialog.prototype.addButtonPanel=function(){this.page[this.curpage].addButtonPanel();return this};AJS.Dialog.prototype.addPanel=function(N,K,M,L){this.page[this.curpage].addPanel(N,K,M,L);return this};AJS.Dialog.prototype.addPage=function(K){new J(this,K);this.page[this.curpage].hide();this.curpage=this.page.length-1;return this};AJS.Dialog.prototype.nextPage=function(){this.page[this.curpage++].hide();if(this.curpage>=this.page.length){this.curpage=0}this.page[this.curpage].show();return this};AJS.Dialog.prototype.prevPage=function(){this.page[this.curpage--].hide();if(this.curpage<0){this.curpage=this.page.length-1}this.page[this.curpage].show();return this};AJS.Dialog.prototype.gotoPage=function(K){this.page[this.curpage].hide();this.curpage=K;if(this.curpage<0){this.curpage=this.page.length-1}else{if(this.curpage>=this.page.length){this.curpage=0}}this.page[this.curpage].show();return this};AJS.Dialog.prototype.getPanel=function(L,M){var K=(M==null)?this.curpage:L;if(M==null){M=L}return this.page[K].panel[M]};AJS.Dialog.prototype.getPage=function(K){return this.page[K]};AJS.Dialog.prototype.getCurrentPanel=function(){return this.page[this.curpage].getCurrentPanel()};AJS.Dialog.prototype.gotoPanel=function(M,L){if(L!=null){var K=M.id||M;this.gotoPage(K)}this.page[this.curpage].gotoPanel(typeof L=="undefined"?M:L)};AJS.Dialog.prototype.show=function(){this.popup.show();AJS.trigger("show.dialog",{dialog:this});return this};AJS.Dialog.prototype.hide=function(){this.popup.hide();AJS.trigger("hide.dialog",{dialog:this});return this};AJS.Dialog.prototype.remove=function(){this.popup.hide();this.popup.remove();AJS.trigger("remove.dialog",{dialog:this})};AJS.Dialog.prototype.disable=function(){this.popup.disable();return this};AJS.Dialog.prototype.enable=function(){this.popup.enable();return this};AJS.Dialog.prototype.get=function(S){var L=[],R=this;var T='#([^"][^ ]*|"[^"]*")';var U=":(\\d+)";var M="page|panel|button|header";var N="(?:("+M+")(?:"+T+"|"+U+")?|"+T+")";var P=new RegExp("(?:^|,)\\s*"+N+"(?:\\s+"+N+")?\\s*(?=,|$)","ig");(S+"").replace(P,function(f,V,e,W,c,b,Y,g,d){V=V&&V.toLowerCase();var X=[];if(V=="page"&&R.page[W]){X.push(R.page[W]);V=b;V=V&&V.toLowerCase();e=Y;W=g;c=d}else{X=R.page}e=e&&(e+"").replace(/"/g,"");Y=Y&&(Y+"").replace(/"/g,"");c=c&&(c+"").replace(/"/g,"");d=d&&(d+"").replace(/"/g,"");if(V||c){for(var a=X.length;a--;){if(c||(V=="panel"&&(e||(!e&&W==null)))){for(var Z=X[a].panel.length;Z--;){if(X[a].panel[Z].button.html()==c||X[a].panel[Z].button.html()==e||(V=="panel"&&!e&&W==null)){L.push(X[a].panel[Z])}}}if(c||(V=="button"&&(e||(!e&&W==null)))){for(var Z=X[a].button.length;Z--;){if(X[a].button[Z].item.html()==c||X[a].button[Z].item.html()==e||(V=="button"&&!e&&W==null)){L.push(X[a].button[Z])}}}if(X[a][V]&&X[a][V][W]){L.push(X[a][V][W])}if(V=="header"&&X[a].header){L.push(X[a].header)}}}else{L=L.concat(X)}});var Q={length:L.length};for(var O=L.length;O--;){Q[O]=L[O];for(var K in L[O]){if(!(K in Q)){(function(V){Q[V]=function(){for(var W=this.length;W--;){if(typeof this[W][V]=="function"){this[W][V].apply(this[W],arguments)}}}})(K)}}}return Q};AJS.Dialog.prototype.updateHeight=function(){var K=0;var M=AJS.$(window).height()-E-C-(I*2);for(var L=0;this.getPanel(L);L++){if(this.getPanel(L).body.css({height:"auto",display:"block"}).outerHeight()>K){K=Math.min(M,this.getPanel(L).body.outerHeight())}if(L!==this.page[this.curpage].curtab){this.getPanel(L).body.css({display:"none"})}}for(L=0;this.getPanel(L);L++){this.getPanel(L).body.css({height:K||this.height})}this.page[0].menu.height(K);this.height=K+E+C+1;this.popup.changeSize(undefined,this.height)};AJS.Dialog.prototype.isMaximised=function(){return this.popup.element.outerHeight()>=AJS.$(window).height()-(I*2)};AJS.Dialog.prototype.getCurPanel=function(){return this.getPanel(this.page[this.curpage].curtab)};AJS.Dialog.prototype.getCurPanelButton=function(){return this.getCurPanel().button};AJS.Dialog=AJS.deprecate.construct(AJS.Dialog,"Dialog constructor",{alternativeName:"Dialog2"});AJS.popup=AJS.deprecate.construct(AJS.popup,"Dialog popup constructor",{alternatveName:"Dialog2"})})();;
