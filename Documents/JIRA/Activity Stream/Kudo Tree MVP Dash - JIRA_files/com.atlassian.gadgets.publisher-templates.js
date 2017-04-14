;/* module-key = 'com.atlassian.gadgets.publisher:templates', location = 'templates/soyutils.js' */
var soy=soy||{};(function(){var ua=navigator.userAgent;var isOpera=ua.indexOf("Opera")==0;soy.IS_OPERA_=isOpera;soy.IS_IE_=!isOpera&&ua.indexOf("MSIE")!=-1;soy.IS_WEBKIT_=!isOpera&&ua.indexOf("WebKit")!=-1})();soy.StringBuilder=function(opt_a1,var_args){this.buffer_=soy.IS_IE_?[]:"";if(opt_a1!=null){this.append.apply(this,arguments)}};soy.StringBuilder.prototype.bufferLength_=0;soy.StringBuilder.prototype.append=function(a1,opt_a2,var_args){if(soy.IS_IE_){if(opt_a2==null){this.buffer_[this.bufferLength_++]=a1}else{this.buffer_.push.apply(this.buffer_,arguments);this.bufferLength_=this.buffer_.length}}else{this.buffer_+=a1;if(opt_a2!=null){for(var i=1;i<arguments.length;i++){this.buffer_+=arguments[i]}}}return this};soy.StringBuilder.prototype.clear=function(){if(soy.IS_IE_){this.buffer_.length=0;this.bufferLength_=0}else{this.buffer_=""}};soy.StringBuilder.prototype.toString=function(){if(soy.IS_IE_){var str=this.buffer_.join("");this.clear();if(str){this.append(str)}return str}else{return(this.buffer_)}};soy.renderElement=function(element,template,opt_templateData){element.innerHTML=template(opt_templateData)};soy.renderAsFragment=function(template,opt_templateData){var tempDiv=document.createElement("div");tempDiv.innerHTML=template(opt_templateData);if(tempDiv.childNodes.length==1){return tempDiv.firstChild}else{var fragment=document.createDocumentFragment();while(tempDiv.firstChild){fragment.appendChild(tempDiv.firstChild)}return fragment}};soy.$$augmentData=function(origData,additionalParams){function tempCtor(){}tempCtor.prototype=origData;var newData=new tempCtor();for(var key in additionalParams){newData[key]=additionalParams[key]}return newData};soy.$$escapeHtml=function(str){str=String(str);if(!soy.$$EscapeHtmlRe_.ALL_SPECIAL_CHARS.test(str)){return str}if(str.indexOf("&")!=-1){str=str.replace(soy.$$EscapeHtmlRe_.AMP,"&amp;")}if(str.indexOf("<")!=-1){str=str.replace(soy.$$EscapeHtmlRe_.LT,"&lt;")}if(str.indexOf(">")!=-1){str=str.replace(soy.$$EscapeHtmlRe_.GT,"&gt;")}if(str.indexOf('"')!=-1){str=str.replace(soy.$$EscapeHtmlRe_.QUOT,"&quot;")}return str};soy.$$EscapeHtmlRe_={ALL_SPECIAL_CHARS:/[&<>\"]/,AMP:/&/g,LT:/</g,GT:/>/g,QUOT:/\"/g};soy.$$escapeJs=function(s){s=String(s);var sb=[];for(var i=0;i<s.length;i++){sb[i]=soy.$$escapeChar(s.charAt(i))}return sb.join("")};soy.$$escapeChar=function(c){if(c in soy.$$escapeCharJs_){return soy.$$escapeCharJs_[c]}var rv=c;var cc=c.charCodeAt(0);if(cc>31&&cc<127){rv=c}else{if(cc<256){rv="\\x";if(cc<16||cc>256){rv+="0"}}else{rv="\\u";if(cc<4096){rv+="0"}}rv+=cc.toString(16).toUpperCase()}return soy.$$escapeCharJs_[c]=rv};soy.$$escapeCharJs_={"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"'":"\\'","\\":"\\\\"};soy.$$escapeUri=function(str){str=String(str);if(!soy.$$ENCODE_URI_REGEXP_.test(str)){return encodeURIComponent(str)}else{return str}};soy.$$ENCODE_URI_REGEXP_=/^[a-zA-Z0-9\-_.!~*'()]*$/;soy.$$insertWordBreaks=function(str,maxCharsBetweenWordBreaks){str=String(str);var resultArr=[];var resultArrLen=0;var isInTag=false;var isMaybeInEntity=false;var numCharsWithoutBreak=0;var flushIndex=0;for(var i=0,n=str.length;i<n;++i){var charCode=str.charCodeAt(i);if(numCharsWithoutBreak>=maxCharsBetweenWordBreaks&&charCode!=soy.$$CharCode_.SPACE){resultArr[resultArrLen++]=str.substring(flushIndex,i);flushIndex=i;resultArr[resultArrLen++]=soy.WORD_BREAK_;numCharsWithoutBreak=0}if(isInTag){if(charCode==soy.$$CharCode_.GREATER_THAN){isInTag=false}}else{if(isMaybeInEntity){switch(charCode){case soy.$$CharCode_.SEMI_COLON:isMaybeInEntity=false;++numCharsWithoutBreak;break;case soy.$$CharCode_.LESS_THAN:isMaybeInEntity=false;isInTag=true;break;case soy.$$CharCode_.SPACE:isMaybeInEntity=false;numCharsWithoutBreak=0;break}}else{switch(charCode){case soy.$$CharCode_.LESS_THAN:isInTag=true;break;case soy.$$CharCode_.AMPERSAND:isMaybeInEntity=true;break;case soy.$$CharCode_.SPACE:numCharsWithoutBreak=0;break;default:++numCharsWithoutBreak;break}}}}resultArr[resultArrLen++]=str.substring(flushIndex);return resultArr.join("")};soy.$$CharCode_={SPACE:32,AMPERSAND:38,SEMI_COLON:59,LESS_THAN:60,GREATER_THAN:62};soy.WORD_BREAK_=soy.IS_WEBKIT_?"<wbr></wbr>":soy.IS_OPERA_?"&shy;":"<wbr>";soy.$$changeNewlineToBr=function(str){str=String(str);if(!soy.$$CHANGE_NEWLINE_TO_BR_RE_.test(str)){return str}return str.replace(/(\r\n|\r|\n)/g,"<br>")};soy.$$CHANGE_NEWLINE_TO_BR_RE_=/[\r\n]/;soy.$$bidiTextDir=function(text,opt_isHtml){text=soy.$$bidiStripHtmlIfNecessary_(text,opt_isHtml);if(!text){return 0}return soy.$$bidiDetectRtlDirectionality_(text)?-1:1};soy.$$bidiDirAttr=function(bidiGlobalDir,text,opt_isHtml){var dir=soy.$$bidiTextDir(text,opt_isHtml);if(dir!=bidiGlobalDir){return dir<0?"dir=rtl":dir>0?"dir=ltr":""}return""};soy.$$bidiMarkAfter=function(bidiGlobalDir,text,opt_isHtml){var dir=soy.$$bidiTextDir(text,opt_isHtml);return soy.$$bidiMarkAfterKnownDir(bidiGlobalDir,dir,text,opt_isHtml)};soy.$$bidiMarkAfterKnownDir=function(bidiGlobalDir,dir,text,opt_isHtml){return(bidiGlobalDir>0&&(dir<0||soy.$$bidiIsRtlExitText_(text,opt_isHtml))?"\u200E":bidiGlobalDir<0&&(dir>0||soy.$$bidiIsLtrExitText_(text,opt_isHtml))?"\u200F":"")};soy.$$bidiStripHtmlIfNecessary_=function(str,opt_isHtml){return opt_isHtml?str.replace(soy.$$BIDI_HTML_SKIP_RE_," "):str};soy.$$BIDI_HTML_SKIP_RE_=/<[^>]*>|&[^;]+;/g;soy.$$bidiSpanWrap=function(bidiGlobalDir,str){str=String(str);var textDir=soy.$$bidiTextDir(str,true);var reset=soy.$$bidiMarkAfterKnownDir(bidiGlobalDir,textDir,str,true);if(textDir>0&&bidiGlobalDir<=0){str="<span dir=ltr>"+str+"</span>"}else{if(textDir<0&&bidiGlobalDir>=0){str="<span dir=rtl>"+str+"</span>"}}return str+reset};soy.$$bidiUnicodeWrap=function(bidiGlobalDir,str){str=String(str);var textDir=soy.$$bidiTextDir(str,true);var reset=soy.$$bidiMarkAfterKnownDir(bidiGlobalDir,textDir,str,true);if(textDir>0&&bidiGlobalDir<=0){str="\u202A"+str+"\u202C"}else{if(textDir<0&&bidiGlobalDir>=0){str="\u202B"+str+"\u202C"}}return str+reset};soy.$$bidiLtrChars_="A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF"+"\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";soy.$$bidiNeutralChars_="\u0000-\u0020!-@[-`{-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF";soy.$$bidiRtlChars_="\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";soy.$$bidiRtlDirCheckRe_=new RegExp("^[^"+soy.$$bidiLtrChars_+"]*["+soy.$$bidiRtlChars_+"]");soy.$$bidiNeutralDirCheckRe_=new RegExp("^["+soy.$$bidiNeutralChars_+"]*$|^http://");soy.$$bidiIsRtlText_=function(str){return soy.$$bidiRtlDirCheckRe_.test(str)};soy.$$bidiIsNeutralText_=function(str){return soy.$$bidiNeutralDirCheckRe_.test(str)};soy.$$bidiRtlDetectionThreshold_=0.4;soy.$$bidiRtlWordRatio_=function(str){var rtlCount=0;var totalCount=0;var tokens=str.split(" ");for(var i=0;i<tokens.length;i++){if(soy.$$bidiIsRtlText_(tokens[i])){rtlCount++;totalCount++}else{if(!soy.$$bidiIsNeutralText_(tokens[i])){totalCount++}}}return totalCount==0?0:rtlCount/totalCount};soy.$$bidiDetectRtlDirectionality_=function(str){return soy.$$bidiRtlWordRatio_(str)>soy.$$bidiRtlDetectionThreshold_};soy.$$bidiLtrExitDirCheckRe_=new RegExp("["+soy.$$bidiLtrChars_+"][^"+soy.$$bidiRtlChars_+"]*$");soy.$$bidiRtlExitDirCheckRe_=new RegExp("["+soy.$$bidiRtlChars_+"][^"+soy.$$bidiLtrChars_+"]*$");soy.$$bidiIsLtrExitText_=function(str,opt_isHtml){str=soy.$$bidiStripHtmlIfNecessary_(str,opt_isHtml);return soy.$$bidiLtrExitDirCheckRe_.test(str)};soy.$$bidiIsRtlExitText_=function(str,opt_isHtml){str=soy.$$bidiStripHtmlIfNecessary_(str,opt_isHtml);return soy.$$bidiRtlExitDirCheckRe_.test(str)};;
;/* module-key = 'com.atlassian.gadgets.publisher:templates', location = 'templates/messages/error.js' */
// This file was automatically generated from error.soy.
// Please don't edit this file by hand.

if (typeof AG == 'undefined') { var AG = {}; }
if (typeof AG.templates == 'undefined') { AG.templates = {}; }
if (typeof AG.templates.messages == 'undefined') { AG.templates.messages = {}; }


AG.templates.messages.error = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message error"><span class="aui-icon icon-error"></span> <p>', opt_data.message, '</p></div>');
  if (!opt_sb) return output.toString();
};
;
;/* module-key = 'com.atlassian.gadgets.publisher:templates', location = 'templates/messages/warning.js' */
// This file was automatically generated from warning.soy.
// Please don't edit this file by hand.

if (typeof AG == 'undefined') { var AG = {}; }
if (typeof AG.templates == 'undefined') { AG.templates = {}; }
if (typeof AG.templates.messages == 'undefined') { AG.templates.messages = {}; }


AG.templates.messages.warning = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message warning"><span class="aui-icon icon-warning"></span> <p>', opt_data.message, '</p></div>');
  if (!opt_sb) return output.toString();
};
;
;/* module-key = 'com.atlassian.gadgets.publisher:templates', location = 'templates/messages/info.js' */
// This file was automatically generated from info.soy.
// Please don't edit this file by hand.

if (typeof AG == 'undefined') { var AG = {}; }
if (typeof AG.templates == 'undefined') { AG.templates = {}; }
if (typeof AG.templates.messages == 'undefined') { AG.templates.messages = {}; }


AG.templates.messages.info = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="aui-message info"><span class="aui-icon icon-info"></span> <p>', opt_data.message, '</p></div>');
  if (!opt_sb) return output.toString();
};


AG.templates.messages.invalidConfig = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append(soy.$$escapeHtml(opt_data.description), '<ul>');
  var errorList19 = opt_data.errors;
  var errorListLen19 = errorList19.length;
  for (var errorIndex19 = 0; errorIndex19 < errorListLen19; errorIndex19++) {
    var errorData19 = errorList19[errorIndex19];
    output.append('<li><strong>', errorData19, '</strong>');
  }
  output.append('</ul>');
  if (!opt_sb) return output.toString();
};
;
