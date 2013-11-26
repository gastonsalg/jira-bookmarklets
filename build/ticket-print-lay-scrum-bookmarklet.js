javascript:void(function(){var Namespace=function(a){"use strict";return{create:function(b){for(var c,d=a,e=b.split("."),f=e.length,g=0;f>g;g++)c=e[g],d=d[c]=d[c]||{}},is:function(b){for(var c,d=a,e=!1,f=b.split("."),g=f.length,h=0;g>h;h++){if(c=f[h],!d[c])return e=!1,!1;d=d[c],e=!0}return e}}}(this);Namespace.create("xing.core"),xing.core.DataCollector=function(){"use strict";var a=this,b=location.hostname,c=b?".":"";a.COLLABORATOR_KEY=b+c+"collaborators",a.TICKET_KEY=b+c+"ticket",a.observers=[],a.ticketData={},a.getCachedTickets=function(){var b=localStorage.getItem(a.TICKET_KEY);return b&&b[0]?JSON.parse(b):[]},a.subscribe=function(b){a.observers.push(b)},a.unsubscribe=function(b){var c=a.observer.indexOf(b);c>=0&&a.observers.splice(c)},a.update=function(b){a.ticketData=$.extend(a.ticketData,b||{}),a.observers.forEach(function(a){a.update()})},a.cacheTicket=function(b){var c=a.getCachedTickets(),d=c.concat([b]);localStorage.setItem(a.TICKET_KEY,JSON.stringify(d))},a.removeCachedTickets=function(b){if(void 0!==b){var c=a.getCachedTickets();c[0]&&(c.splice(b,1),localStorage.setItem(a.TICKET_KEY,JSON.stringify(c)))}else localStorage.removeItem(a.TICKET_KEY);return a.getCachedTickets()},a.addCollaborators=function(b){var c=localStorage.getItem(a.COLLABORATOR_KEY)||"",d=window.prompt(b,c||"");null!==d&&(localStorage.setItem(a.COLLABORATOR_KEY,d),this.update({collaborators:d.toArray()}))}},String.prototype.truncate=function(a){"use strict";var b=this.length,c="…",d=c.length,e=this;return b>a&&(e=this.substr(0,a-d)+c),e},String.prototype.trimWhitespace=function(){"use strict";return this.replace(/\s+/g," ").split(/\n/).join(" ")},String.prototype.toArray=function(a){"use strict";return a=new RegExp(a||","),this.split(a)},Namespace.create("xing.core"),xing.core.I18n=function(){"use strict";this.en={messages:{ticketCached:{title:"Ticket print",body:"Ticket is stored! Please navigate to another if you want print one ticket more."}},modal:{collaboratorPrompt:'Please enter your collaborators!\nNote: Separate the names with a comma e.g. "Jeffrey, Walter"',heading:"Print preview",select:"Select another:",action:{addCollaborator:"Add Collaborators",remove:"Remove ticket form the list",print:"Print",cancel:"Cancel"},ticketCount:"You are printing tickets",pageCount:" on pages"},ticket:{collaborator:{title:"Pairing partner",action:'<button id="gm-add-collaborator" class="aui-button gm-snap-right"><i>+</i> Add Collaborators</button>'},component:{title:"Component"},closed:{title:"End date",body:"Day | Time"},created:{title:"Created"},storyPoints:{title:"Story Points"},dueDate:{title:"Due date"},reporter:{title:"Reporter"},target:{title:"Target"},type:{title:"Type"},start:{title:"Start Progress",body:"Day | Time"}}},this.local=function(a){return this[a||"en"]}},Namespace.create("xing.core"),xing.core.Presenter=function(){"use strict";var a=this;a.dashalizer=function(a){return a.toLowerCase().replace(/ /g,"-")},a.getString=function(a){return(a||"").trimWhitespace()},a.getDate=function(a){var b,c,d,e,f="";return a&&(b=new Date(a),c=b.getMonth()+1,c=c>9?c:"0"+c,d=b.getFullYear(),e=b.getDate(),f=d+"-"+c+"-"+e),f},a.getStorageItem=function(a){var b=localStorage.getItem(a)||"";return b.toArray()},a.getElementText=function(a){return a[0]?a.text().trimWhitespace():""}},Namespace.create("xing.core.table"),xing.core.table.Builder=function(){"use strict";var a=this;a._text=function(a){return"text"in a?a.text:""},a._addCssClass=function(a,b){b=" "+(b||"");var c,d=a.options||{},e="cssClass"in d?d.cssClass:"",f="";$.extend(d,{cssClass:e+b})," "===d.cssClass&&delete d.cssClass;for(c in d){var g="cssClass"===c?"class":c,h=d[c]||"";g=g.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),f+=" "+g+'="'+h+'"'}return f},a.row=function(b){var c="";return b.forEach(function(b){c+=a.cell(b)}),"<tr>"+c+"</tr>"},a.cell=function(b){var c=b.cell,d="",e=b.head?"th":"td";return d+=a._cellTitle(c),d+=a._cellBody(c),"<"+e+a._addCssClass(c)+'><div class="gm-inner">'+d+"</div></"+e+">"},a._cellBody=function(b){var c="";if("body"in b){var d=b.body;c+="<div"+a._addCssClass(d,"gm-bd")+">"+a._text(d)+"</div>"}return c},a._cellTitle=function(b){var c="";if("title"in b){var d=b.title;c+="<div"+a._addCssClass(d,"gm-hd")+">"+a._text(d)+"</div>"}return c},a.render=function(b){var c="";return b.forEach(function(b){c+=a.row(b)}),'<table class="gm-table">'+c+"</table>"}},Namespace.create("xing.core.table"),xing.core.table.layout={DEFAULT_LAYOUT:"default",SCRUM_LAYOUT:"scrum",_layouts:{"default":[["number","type","component","target"],["title"],["collobarators"],["created","dueDate","reporter","start","closed"]],scrum:[["number","type","component","target"],["title"],["collobarators"],["created","dueDate","start","closed","storyPoints"]]},get:function(a){"use strict";var b=this._layouts[a];return b}},xing.core.table.Map=function(a,b){"use strict";var c=this,d=(new xing.core.I18n).local().ticket,e=xing.core.table.layout;b=b||e.DEFAULT_LAYOUT,c.build=function(f,g){g=g||e.get(b);for(var h=[],i=0,j=g.length;j>i;i++){var k=g[i];"string"==typeof k?(d=d,h[i]=a[k]({data:f,local:d})):h[i]=c.build(f,k)}return h}},Namespace.create("xing.jira"),xing.jira.Application=function(a,b){"use strict";var c,d,e,f=this,g=xing.core;f.initialze=function(a){c=new g.DataCollector,e=new g.table.Builder,f.tableMap=new g.table.Map(new xing.jira.TableMapCell,b),d=(new g.I18n).local(),f.addStyle(a),f.collectDataFromDom(c)},f._getContainer=function(a){return a.hasClass("gm-container")&&a||a.parents(".gm-container")},f._clickOutsidePopupHandler=function(a){var b=$(a.target),c=f._getContainer(b);c[0]||f._hidePopup()},f._hidePopup=function(){$("#gm-popup").remove(),$(document).off("click",f._clickOutsidePopupHandler)},f._updateHTML=function(a){$("#gm-popup").remove();var b=f.tableMap.build(c.ticketData),g=e.render(b),h="",i=a.length+1,j=Math.ceil(i/2);a.forEach(function(a){var b=$(a).find(".gm-number").text(),c=$(g).find(".gm-number").text(),e="aui-button gm-button-danger js-gm-remove-ticket";b!==c&&(h+='<li class="gm-output-item">'+a+'<div class="gm-ticket-action-panel"><button type="button" class="'+e+'">'+d.modal.action.remove+"</button></div></li>")}),$("body").append($('<div id="gm-popup"><div class="gm-container jira-dialog box-shadow "><div class="jira-dialog-heading"><h2>'+d.modal.heading+'</h2></div><div class="jira-dialog-content"><div class="gm-page-counter h5">'+d.modal.ticketCount+" "+i+d.modal.pageCount+" "+j+'</div><div class="form-body"><ul class="gm-output-list">'+h+'<li class="gm-output-item">'+g+'</li></ul></div><div class="buttons-container form-footer"><div class="buttons"><label for="gm-select-ticket">'+d.modal.select+'</label>&nbsp;<button id="gm-select-ticket" class="gm-pick-more aui-button"><i>+</i></button>&nbsp;<button class="gm-print aui-button">'+d.modal.action.print+'</button><a class="gm-cancel cancel" href="#">'+d.modal.action.cancel+'</a></div></div></div></div><div class="aui-blanket"></div></div>'))},f.addStyle=function(a){if(!$("#gm-style")[0]&&a){var b=$('<style id="gm-style" type="text/css"></style>');$(document.head).append(b.html(a))}},f.cacheTicketHandler=function(){f.update();var a=$("#gm-popup .gm-table:last"),b="";b=a[0].outerHTML,c.cacheTicket(b.trimWhitespace()),f._hidePopup(),f._showSuccessMessage()},f._showSuccessMessage=function(){$(".aui-message").remove(),AJS.messages.success(".aui-page-header-inner",{title:d.messages.ticketCached.title,body:d.messages.ticketCached.body}),setTimeout(function(){$(".aui-message").remove()},5e3)},f.showPopup=function(){$("#gm-popup")[0]||(c.subscribe(this),f._updateHTML(c.getCachedTickets()),$("body").on("click",".gm-print",function(a){a.preventDefault(),window.print(),c.removeCachedTickets(),f._hidePopup()}).on("click",".gm-pick-more",function(a){a.preventDefault(),f.cacheTicketHandler()}).on("click",".gm-cancel",function(a){a.preventDefault(),f._hidePopup()}).on("click",".js-gm-remove-ticket",function(a){a.preventDefault();var b=$(a.target).parents("li"),d=b.index(b);c.removeCachedTickets(d),$("#gm-popup .form-body table").eq(d).remove(),f._updateHTML(c.getCachedTickets())}).on("click","#gm-add-collaborator",function(){c.addCollaborators(d.modal.collaboratorPrompt)}))},f.update=function(){f._updateHTML(c.getCachedTickets())},f.collectDataFromDom=function(a){var b=$("#greenhopper-agile-issue-web-panel dd a"),c=new g.Presenter,d=c.getString($("#type-val img").attr("alt")),e=a.COLLABORATOR_KEY,f=c.getString($("#summary-val").text());a.update({number:c.getString($("#key-val").text()),description:c.getString($("#description-val").text()),storyPoints:c.getString($("#customfield_10080-val").text()),dueDate:c.getDate($("#due-date time").attr("datetime")),collaborators:c.getStorageItem(e).join(" "),type:d,typeSelector:c.dashalizer(d),reporter:c.getString($("#reporter-val span").text()),created:c.getDate($("#create-date time").attr("datetime")),title:f.truncate(220),component:c.getString($("#components-field").text()),target:c.getElementText(b)})},f.initialze(a)},Namespace.create("xing.jira"),xing.jira.TableMapCell=function(){"use strict";var a=this,b=5;a._titleBody=function(a,b){return{cell:{title:{text:a.local[b].title},body:{text:a.data[b]}}}},a.number=function(a){return{head:!0,cell:{options:{colspan:2,cssClass:"gm-number gm-ltr"},body:{text:a.data.number,options:{cssClass:"h1",title:a.data.number}}}}},a.type=function(a){return{cell:{title:{text:a.local.type.title},body:{options:{cssClass:"gm-label gm-label-"+a.data.typeSelector},text:a.data.type}}}},a.component=function(b){return a._titleBody(b,"component")},a.target=function(b){return a._titleBody(b,"target")},a.title=function(a){return{head:!0,cell:{options:{colspan:b,cssClass:"gm-title gm-ltr"},body:{text:a.data.title,options:{cssClass:"h2 gm-hyphen"}}}}},a.collobarators=function(a){return{cell:{options:{colspan:b,cssClass:"gm-pairing"},title:{text:a.local.collaborator.title,options:{cssClass:"gm-snap-left h5"}},body:{text:a.data.collaborators+a.local.collaborator.action,options:{cssClass:"h5"}}}}},a.created=function(b){return a._titleBody(b,"created")},a.dueDate=function(a){return{cell:{title:{text:a.local.dueDate.title},body:{options:{cssClass:a.data.dueDate?"gm-label-danger gm-label":""},text:a.data.dueDate}}}},a.reporter=function(b){return a._titleBody(b,"reporter")},a.storyPoints=function(a){return{cell:{title:{options:{cssClass:"gm-center"},text:a.local.storyPoints.title},body:{options:{cssClass:"gm-center h3"},text:a.data.storyPoints}}}},a.start=function(a){return{cell:{options:{cssClass:"gm-date-content gm-20"},title:{text:a.local.start.title},body:{text:a.local.start.body}}}},a.closed=function(a){return{cell:{options:{cssClass:"gm-date-content gm-20"},title:{text:a.local.closed.title},body:{text:a.local.closed.body}}}}};var xingJiraApp = new xing.jira.Application('.gm-table{border-collapse:collapse;font:10pt helvetica,arial,sans-serif;padding-bottom:2mm;width:100%}.gm-table,.gm-table th,.gm-table td{border:1px solid #DDD}.gm-table td{vertical-align:top}.gm-pick-more i{font-size:1.4em;font-style:normal;font-weight:700;line-height:0}.gm-hd{color:#999;font-size:.8em;line-height:1.4em;text-align:left;text-transform:uppercase}.gm-ltr{text-align:left}.h1{font-size:3em}.h2{font-size:2.4em}.h3{font-size:2em}.h4{font-size:1.4em;line-height:1.5em}.h5{font-size:.8em;line-height:1.4em}.gm-snap-left{float:left}.gm-snap-right{float:right}.gm-grid-item{display:inline-block}.gm-10{width:10%}.gm-20{width:20%}.gm-40{width:40%}.gm-60{width:60%}.gm-button-danger{color:#c00}.gm-label{background-color:#999;border-radius:.2em;color:#fff;display:inline-block;font-weight:700;line-height:1em;padding:4px 8px 2px}.gm-label-danger{background-color:#c00}.gm-label-bug{background-color:#c00}.gm-label-user-story{background-color:#8CAF68}.gm-ticket-section{background-color:#999;display:inline-block;height:8px;line-height:0;overflow:hidden;position:relative;text-indent:-99em;width:12px}.gm-remove-ticket{background-color:#ccc}.gm-remove-ticket:hover{background-color:#E94902}.gm-remove-ticket:hover:after{color:#fff;content:"✖";display:inline-block;height:100%;left:0;line-height:.5em;position:absolute;text-align:center;text-indent:10%;top:0;width:100%}.gm-center{text-align:center}.gm-left{text-align:left}.gm-hyphen{hyphens:auto;-o-hyphens:auto;-ms-hyphens:auto;-moz-hyphens:auto;-wekit-hyphens:auto}.gm-inner{padding:2mm 3mm}.gm-title .gm-inner{overflow:hidden;padding-bottom:0}.gm-title .gm-inner{height:6.5cm}.gm-number .gm-bd{word-break:break-all}.gm-pairing .gm-inner{overflow:hidden}.gm-pairing .gm-hd{padding-right:3mm}.gm-pairing .gm-bd{overflow:hidden}.gm-qa .gm-bd{border-radius:2em;border:1px solid #DDD;height:40px;margin:auto;width:40px}.gm-output-list{margin:0;padding:0}.gm-output-item{-o-box-sizing:border-box;-ms-box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;height:12.2cm;overflow:hidden;page-break-inside:avoid;position:relative}.gm-warning{background-color:#E94902;color:#fff}.gm-warning .gm-hd{color:#fff}.gm-date-content .gm-hd{padding:0 0 1px;text-align:center}.gm-date-content .gm-bd{color:#DDD;font-size:.8em;text-align:center;text-transform:uppercase}.gm-date-content .gm-inner{min-height:1.2cm}.gm-container .gm-print{margin:0 10px 0 0}.global .aui-message{left:50%;margin-left:-220px;position:absolute;top:20px;z-index:101}@media print{html,body{background-color:#fff}#page,.aui-blanket,.gm-container .form-footer,.gm-container .jira-dialog-heading,.gm-page-counter,#gm-add-collaborator{display:none}.gm-container.jira-dialog{border:0;margin:0;padding:0}.gm-container{box-shadow:none!important;border-radius:0!important;left:0;margin:0;max-height:none;padding:0;position:absolute;top:0;width:100%}.gm-container .form-body{padding:0!important}}@media screen{.gm-container{left:50%;margin-left:-9cm;margin-top:5%;top:0;width:18.9cm}.gm-container .form-body{height:460px;padding:2mm!important}.gm-output-list{counter-reset:page-counter}.gm-output-item:nth-child(odd){counter-increment:page-counter}.gm-output-item:nth-child(even){border-bottom:2px dashed #DDD}.gm-output-item:nth-child(odd):before,.gm-output-item:nth-child(even):after{color:#999;display:block;font-size:.8em;text-align:center}.gm-output-item:nth-child(odd):before{content:"Begin of page " counter(page-counter);margin-bottom:1em}.gm-output-item:nth-child(even):after{content:"End of page " counter(page-counter);margin-top:1em}.gm-ticket-action-panel{align-items:center;background-color:rgba(0,0,0,.3);bottom:8.5em;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;justify-content:center;left:0;position:absolute;right:0;text-align:center;top:6.2em;transition:.4s;opacity:0}.gm-output-item:hover .gm-ticket-action-panel{opacity:1}.gm-output-item:nth-child(even) .gm-ticket-action-panel{bottom:2.3em;top:0}.aui-button.gm-button-danger:hover{border-color:#8F3601}.aui-button.gm-pick-more:hover{border-color:#8CAF68}.gm-page-counter{color:#999;position:absolute;right:2em;top:2.2em}}', xing.core.table.layout.SCRUM_LAYOUT);xingJiraApp.versionTimestamp="2013-11-26 11:56:40 AM";xingJiraApp.version="2.1.0";xingJiraApp.showPopup();})();