(()=>{"use strict";var t={614:(t,e,i)=>{var s;i.r(e),i.d(e,{NIL:()=>T,parse:()=>f,stringify:()=>l,v1:()=>v,v3:()=>j,v4:()=>L,v5:()=>P,validate:()=>d,version:()=>A});var n=new Uint8Array(16);function r(){if(!s&&!(s="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return s(n)}const o=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,d=function(t){return"string"==typeof t&&o.test(t)};for(var a=[],c=0;c<256;++c)a.push((c+256).toString(16).substr(1));const l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=(a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]).toLowerCase();if(!d(i))throw TypeError("Stringified UUID is invalid");return i};var h,m,p=0,u=0;const v=function(t,e,i){var s=e&&i||0,n=e||new Array(16),o=(t=t||{}).node||h,d=void 0!==t.clockseq?t.clockseq:m;if(null==o||null==d){var a=t.random||(t.rng||r)();null==o&&(o=h=[1|a[0],a[1],a[2],a[3],a[4],a[5]]),null==d&&(d=m=16383&(a[6]<<8|a[7]))}var c=void 0!==t.msecs?t.msecs:Date.now(),v=void 0!==t.nsecs?t.nsecs:u+1,f=c-p+(v-u)/1e4;if(f<0&&void 0===t.clockseq&&(d=d+1&16383),(f<0||c>p)&&void 0===t.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");p=c,u=v,m=d;var D=(1e4*(268435455&(c+=122192928e5))+v)%4294967296;n[s++]=D>>>24&255,n[s++]=D>>>16&255,n[s++]=D>>>8&255,n[s++]=255&D;var C=c/4294967296*1e4&268435455;n[s++]=C>>>8&255,n[s++]=255&C,n[s++]=C>>>24&15|16,n[s++]=C>>>16&255,n[s++]=d>>>8|128,n[s++]=255&d;for(var I=0;I<6;++I)n[s+I]=o[I];return e||l(n)},f=function(t){if(!d(t))throw TypeError("Invalid UUID");var e,i=new Uint8Array(16);return i[0]=(e=parseInt(t.slice(0,8),16))>>>24,i[1]=e>>>16&255,i[2]=e>>>8&255,i[3]=255&e,i[4]=(e=parseInt(t.slice(9,13),16))>>>8,i[5]=255&e,i[6]=(e=parseInt(t.slice(14,18),16))>>>8,i[7]=255&e,i[8]=(e=parseInt(t.slice(19,23),16))>>>8,i[9]=255&e,i[10]=(e=parseInt(t.slice(24,36),16))/1099511627776&255,i[11]=e/4294967296&255,i[12]=e>>>24&255,i[13]=e>>>16&255,i[14]=e>>>8&255,i[15]=255&e,i};function D(t,e,i){function s(t,s,n,r){if("string"==typeof t&&(t=function(t){t=unescape(encodeURIComponent(t));for(var e=[],i=0;i<t.length;++i)e.push(t.charCodeAt(i));return e}(t)),"string"==typeof s&&(s=f(s)),16!==s.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var o=new Uint8Array(16+t.length);if(o.set(s),o.set(t,s.length),(o=i(o))[6]=15&o[6]|e,o[8]=63&o[8]|128,n){r=r||0;for(var d=0;d<16;++d)n[r+d]=o[d];return n}return l(o)}try{s.name=t}catch(t){}return s.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",s.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",s}function C(t){return 14+(t+64>>>9<<4)+1}function I(t,e){var i=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(i>>16)<<16|65535&i}function g(t,e,i,s,n,r){return I((o=I(I(e,t),I(s,r)))<<(d=n)|o>>>32-d,i);var o,d}function y(t,e,i,s,n,r,o){return g(e&i|~e&s,t,e,n,r,o)}function S(t,e,i,s,n,r,o){return g(e&s|i&~s,t,e,n,r,o)}function E(t,e,i,s,n,r,o){return g(e^i^s,t,e,n,r,o)}function b(t,e,i,s,n,r,o){return g(i^(e|~s),t,e,n,r,o)}const j=D("v3",48,(function(t){if("string"==typeof t){var e=unescape(encodeURIComponent(t));t=new Uint8Array(e.length);for(var i=0;i<e.length;++i)t[i]=e.charCodeAt(i)}return function(t){for(var e=[],i=32*t.length,s="0123456789abcdef",n=0;n<i;n+=8){var r=t[n>>5]>>>n%32&255,o=parseInt(s.charAt(r>>>4&15)+s.charAt(15&r),16);e.push(o)}return e}(function(t,e){t[e>>5]|=128<<e%32,t[C(e)-1]=e;for(var i=1732584193,s=-271733879,n=-1732584194,r=271733878,o=0;o<t.length;o+=16){var d=i,a=s,c=n,l=r;i=y(i,s,n,r,t[o],7,-680876936),r=y(r,i,s,n,t[o+1],12,-389564586),n=y(n,r,i,s,t[o+2],17,606105819),s=y(s,n,r,i,t[o+3],22,-1044525330),i=y(i,s,n,r,t[o+4],7,-176418897),r=y(r,i,s,n,t[o+5],12,1200080426),n=y(n,r,i,s,t[o+6],17,-1473231341),s=y(s,n,r,i,t[o+7],22,-45705983),i=y(i,s,n,r,t[o+8],7,1770035416),r=y(r,i,s,n,t[o+9],12,-1958414417),n=y(n,r,i,s,t[o+10],17,-42063),s=y(s,n,r,i,t[o+11],22,-1990404162),i=y(i,s,n,r,t[o+12],7,1804603682),r=y(r,i,s,n,t[o+13],12,-40341101),n=y(n,r,i,s,t[o+14],17,-1502002290),i=S(i,s=y(s,n,r,i,t[o+15],22,1236535329),n,r,t[o+1],5,-165796510),r=S(r,i,s,n,t[o+6],9,-1069501632),n=S(n,r,i,s,t[o+11],14,643717713),s=S(s,n,r,i,t[o],20,-373897302),i=S(i,s,n,r,t[o+5],5,-701558691),r=S(r,i,s,n,t[o+10],9,38016083),n=S(n,r,i,s,t[o+15],14,-660478335),s=S(s,n,r,i,t[o+4],20,-405537848),i=S(i,s,n,r,t[o+9],5,568446438),r=S(r,i,s,n,t[o+14],9,-1019803690),n=S(n,r,i,s,t[o+3],14,-187363961),s=S(s,n,r,i,t[o+8],20,1163531501),i=S(i,s,n,r,t[o+13],5,-1444681467),r=S(r,i,s,n,t[o+2],9,-51403784),n=S(n,r,i,s,t[o+7],14,1735328473),i=E(i,s=S(s,n,r,i,t[o+12],20,-1926607734),n,r,t[o+5],4,-378558),r=E(r,i,s,n,t[o+8],11,-2022574463),n=E(n,r,i,s,t[o+11],16,1839030562),s=E(s,n,r,i,t[o+14],23,-35309556),i=E(i,s,n,r,t[o+1],4,-1530992060),r=E(r,i,s,n,t[o+4],11,1272893353),n=E(n,r,i,s,t[o+7],16,-155497632),s=E(s,n,r,i,t[o+10],23,-1094730640),i=E(i,s,n,r,t[o+13],4,681279174),r=E(r,i,s,n,t[o],11,-358537222),n=E(n,r,i,s,t[o+3],16,-722521979),s=E(s,n,r,i,t[o+6],23,76029189),i=E(i,s,n,r,t[o+9],4,-640364487),r=E(r,i,s,n,t[o+12],11,-421815835),n=E(n,r,i,s,t[o+15],16,530742520),i=b(i,s=E(s,n,r,i,t[o+2],23,-995338651),n,r,t[o],6,-198630844),r=b(r,i,s,n,t[o+7],10,1126891415),n=b(n,r,i,s,t[o+14],15,-1416354905),s=b(s,n,r,i,t[o+5],21,-57434055),i=b(i,s,n,r,t[o+12],6,1700485571),r=b(r,i,s,n,t[o+3],10,-1894986606),n=b(n,r,i,s,t[o+10],15,-1051523),s=b(s,n,r,i,t[o+1],21,-2054922799),i=b(i,s,n,r,t[o+8],6,1873313359),r=b(r,i,s,n,t[o+15],10,-30611744),n=b(n,r,i,s,t[o+6],15,-1560198380),s=b(s,n,r,i,t[o+13],21,1309151649),i=b(i,s,n,r,t[o+4],6,-145523070),r=b(r,i,s,n,t[o+11],10,-1120210379),n=b(n,r,i,s,t[o+2],15,718787259),s=b(s,n,r,i,t[o+9],21,-343485551),i=I(i,d),s=I(s,a),n=I(n,c),r=I(r,l)}return[i,s,n,r]}(function(t){if(0===t.length)return[];for(var e=8*t.length,i=new Uint32Array(C(e)),s=0;s<e;s+=8)i[s>>5]|=(255&t[s/8])<<s%32;return i}(t),8*t.length))})),L=function(t,e,i){var s=(t=t||{}).random||(t.rng||r)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e){i=i||0;for(var n=0;n<16;++n)e[i+n]=s[n];return e}return l(s)};function w(t,e,i,s){switch(t){case 0:return e&i^~e&s;case 1:case 3:return e^i^s;case 2:return e&i^e&s^i&s}}function O(t,e){return t<<e|t>>>32-e}const P=D("v5",80,(function(t){var e=[1518500249,1859775393,2400959708,3395469782],i=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof t){var s=unescape(encodeURIComponent(t));t=[];for(var n=0;n<s.length;++n)t.push(s.charCodeAt(n))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);for(var r=t.length/4+2,o=Math.ceil(r/16),d=new Array(o),a=0;a<o;++a){for(var c=new Uint32Array(16),l=0;l<16;++l)c[l]=t[64*a+4*l]<<24|t[64*a+4*l+1]<<16|t[64*a+4*l+2]<<8|t[64*a+4*l+3];d[a]=c}d[o-1][14]=8*(t.length-1)/Math.pow(2,32),d[o-1][14]=Math.floor(d[o-1][14]),d[o-1][15]=8*(t.length-1)&4294967295;for(var h=0;h<o;++h){for(var m=new Uint32Array(80),p=0;p<16;++p)m[p]=d[h][p];for(var u=16;u<80;++u)m[u]=O(m[u-3]^m[u-8]^m[u-14]^m[u-16],1);for(var v=i[0],f=i[1],D=i[2],C=i[3],I=i[4],g=0;g<80;++g){var y=Math.floor(g/20),S=O(v,5)+w(y,f,D,C)+I+e[y]+m[g]>>>0;I=C,C=D,D=O(f,30)>>>0,f=v,v=S}i[0]=i[0]+v>>>0,i[1]=i[1]+f>>>0,i[2]=i[2]+D>>>0,i[3]=i[3]+C>>>0,i[4]=i[4]+I>>>0}return[i[0]>>24&255,i[0]>>16&255,i[0]>>8&255,255&i[0],i[1]>>24&255,i[1]>>16&255,i[1]>>8&255,255&i[1],i[2]>>24&255,i[2]>>16&255,i[2]>>8&255,255&i[2],i[3]>>24&255,i[3]>>16&255,i[3]>>8&255,255&i[3],i[4]>>24&255,i[4]>>16&255,i[4]>>8&255,255&i[4]]})),T="00000000-0000-0000-0000-000000000000",A=function(t){if(!d(t))throw TypeError("Invalid UUID");return parseInt(t.substr(14,1),16)}}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{const{v4:t}=i(614),e=class{constructor(e,i,s,n,r=!1){this.title=e,this.dueDate=i,this.description=s,this.priority=n,this.completionStatus=r,this.id=t()}},{v4:s}=i(614),n=class{constructor(t,e=[]){this.id=s(),this.title=t,this.todos=e}},r=class{constructor(){this.projects=JSON.parse(localStorage.getItem("projects"))||[]}createProject(t){const e=new n(t);this.projects.push(e),localStorage.setItem("projects",JSON.stringify(this.projects))}removeProject(t){let e=this.projects.find((e=>e.id===t));this.projects=this.projects.filter((t=>t.id!=e.id)),localStorage.setItem("projects",JSON.stringify(this.projects))}addItem(t,i,s,n,r,o){let d=new e(t,i,s,n,r);this.projects.find((t=>t.id===o)).todos.push(d),localStorage.setItem("projects",JSON.stringify(this.projects))}editItem(t,e,i,s,n,r,o){let d=this.projects.find((t=>t.id===r)).todos.find((t=>t.id===o));d.title=t,d.dueDate=e,d.description=i,d.priority=s,d.completionStatus=n,localStorage.setItem("projects",JSON.stringify(this.projects))}removeItem(t,e){let i=this.projects.find((e=>e.id===t)),s=i.todos.find((t=>t.id===e));i.todos=i.todos.filter((t=>t.id!=s.id)),localStorage.setItem("projects",JSON.stringify(this.projects))}};window.displayController=new class{constructor(){this.appDiv=document.getElementById("app"),this.projectsModel=new r,this.containerDiv=document.createElement("div"),this.containerDiv.id="container",this.contentDiv=document.createElement("div"),this.contentDiv.id="content",this.appDiv.appendChild(this.containerDiv),this.createSidebar(),this.projects=JSON.parse(localStorage.getItem("projects")),this.renderProject(this.projects[0].id),console.log(this.projectsModel)}createSidebar(){this.sidebarDiv=document.createElement("div"),this.logoDiv=document.createElement("div"),this.logoImage=document.createElement("i"),this.logoHR=document.createElement("hr"),this.addProjectBtn=document.createElement("BUTTON"),this.addProjectIco=document.createElement("i"),this.sidebarHR=document.createElement("hr"),this.sidebarContainerDiv=document.createElement("div"),this.userProjectsUl=document.createElement("ul"),this.sidebarDiv.id="sidebar",this.logoDiv.classList.add("logo"),this.logoImage.classList.add("logo-icon","fas","fa-th-list","fa-2x"),this.logoImage.textContent="TODO LIST",this.addProjectBtn.classList.add("add-project-btn"),this.addProjectBtn.textContent="Add Project",this.addProjectIco.classList.add("fas","fa-plus","project-btn"),this.sidebarHR.classList.add("sidebar-container-hr"),this.sidebarContainerDiv.id="sidebar-container",this.userProjectsUl.classList.add("user-projects"),this.containerDiv.appendChild(this.sidebarDiv),this.sidebarDiv.appendChild(this.logoDiv),this.logoDiv.appendChild(this.logoImage),this.logoDiv.appendChild(this.logoHR),this.sidebarContainerDiv.appendChild(this.addProjectBtn),this.addProjectBtn.appendChild(this.addProjectIco),this.sidebarDiv.appendChild(this.sidebarContainerDiv),this.sidebarContainerDiv.appendChild(this.userProjectsUl);let t=JSON.parse(localStorage.getItem("projects"));this.renderProjectList(t),this.addProjectBtn.addEventListener("click",(()=>{let t=new r,e=prompt("Project Title: ");t.createProject(e);let i=JSON.parse(localStorage.getItem("projects"));this.renderProject(i[i.length-1].id),this.clearChildNodes("sidebar")}));let e=document.querySelectorAll(".project");e.forEach((t=>{t.addEventListener("click",(i=>{e.forEach((t=>{t.classList.remove("project-active")})),this.renderProject(i.target.dataset.id),t.classList.add("project-active")}))}))}renderProjectList(t){if(t)for(let e=0;e<t.length;e++)this.projectLi=document.createElement("li"),this.projectLi.classList.add("project"),this.projectLi.setAttribute("data-id",t[e].id),this.projectLi.textContent=t[e].title,this.userProjectsUl.appendChild(this.projectLi)}renderProject(t){let e=JSON.parse(localStorage.getItem("projects"));e.find((e=>e.id===t)).todos,this.clearChildNodes("content"),this.contentContainerDiv=document.createElement("div"),this.contentHeaderDiv=document.createElement("div"),this.currentTitleSpan=document.createElement("span"),this.projectSettingsDiv=document.createElement("div"),this.projectSettingsIcon=document.createElement("i"),this.contentBodyDiv=document.createElement("div"),this.itemDiv=document.createElement("div"),this.addItemBtnDiv=document.createElement("div"),this.addItemIco=document.createElement("i"),this.addItemSpan=document.createElement("span"),this.contentContainerDiv.id="content-container",this.contentHeaderDiv.classList.add("content-header"),this.currentTitleSpan.classList.add("current-project-title"),this.projectSettingsDiv.classList.add("settings-icon"),this.projectSettingsIcon.classList.add("far","fa-trash-alt","fa-lg"),this.contentBodyDiv.classList.add("content-body"),this.itemDiv.classList.add("items"),this.addItemBtnDiv.classList.add("add-item-btn"),this.addItemIco.classList.add("fas","fa-plus","item-btn"),this.addItemSpan.classList.add("add-item-text"),this.currentTitleSpan.innerText=e.find((e=>e.id===t)).title,this.currentTitleSpan.setAttribute("data-id",t),this.containerDiv.appendChild(this.contentDiv),this.contentDiv.appendChild(this.contentContainerDiv),this.contentContainerDiv.appendChild(this.contentHeaderDiv),this.contentHeaderDiv.appendChild(this.currentTitleSpan),this.projectSettingsDiv.appendChild(this.projectSettingsIcon),this.contentHeaderDiv.appendChild(this.projectSettingsDiv),this.contentContainerDiv.appendChild(this.contentBodyDiv),this.renderItems(t),document.querySelectorAll(".item").forEach((t=>{t.addEventListener("mouseenter",(()=>{t.querySelector(".item-options").style.display="block"})),t.addEventListener("mouseleave",(()=>{t.querySelector(".item-options").style.display="none"}))})),this.contentBodyDiv.appendChild(this.addItemBtnDiv),this.addItemBtnDiv.appendChild(this.addItemIco),this.addItemSpan.innerText="Add Item",this.addItemBtnDiv.appendChild(this.addItemSpan),this.itemForm(),document.querySelectorAll(".delete-item").forEach((e=>{e.addEventListener("click",(i=>{let s=e.getAttribute("item-id");this.projectsModel.removeItem(t,s),this.renderProject(t)}))})),this.projectSettingsDiv.addEventListener("click",(()=>{this.projectsModel.removeProject(t),this.clearChildNodes("sidebar"),this.renderProject(this.projects[0].id)})),this.addItemBtnDiv.addEventListener("click",(()=>{this.newItemSubmit.removeAttribute("item-id"),this.formContainer.style.display="grid",this.newItemSubmit.setAttribute("btn-type","new"),this.formHeaderSpan.innerText="Add Item",this.itemTitleInput.value="",this.itemDescInput.value="",this.prioritySelection.value="",this.itemDueDateInput.value=""})),document.querySelectorAll(".item-edit").forEach((e=>{e.addEventListener("click",(i=>{let s=JSON.parse(localStorage.getItem("projects")),n=e.getAttribute("dataset-id");this.formContainer.style.display="grid";let r=s.find((e=>e.id===t)).todos.find((t=>t.id===n));this.formHeaderSpan.innerText="Edit Item",this.itemTitleInput.value=r.title,this.itemDescInput.value=r.description,this.prioritySelection.value=r.priority,this.itemDueDateInput.value=r.dueDate,this.newItemSubmit.setAttribute("btn-type","edit"),this.newItemSubmit.setAttribute("item-id",n)}))})),document.getElementsByName("item-status").forEach((e=>{let i=e.getAttribute("item-id"),s=this.projects.find((e=>e.id===t)).todos.find((t=>t.id===i));e.addEventListener("click",(()=>{!1===e.checked?(s.completionStatus=!1,localStorage.setItem("projects",JSON.stringify(this.projects)),this.clearChildNodes("items"),this.renderProject(t)):(s.completionStatus=!0,localStorage.setItem("projects",JSON.stringify(this.projects)),this.clearChildNodes("items"),this.renderProject(t))}))})),this.newItemSubmit.addEventListener("click",(()=>{let e=this.itemTitleInput.value,i=this.itemDueDateInput.value,s=this.itemDescInput.value,n=this.prioritySelection.value,r=this.currentTitleSpan.dataset.id;if("new"===this.newItemSubmit.getAttribute("btn-type"))this.projectsModel.addItem(e,i,s,n,!1,r),this.renderProject(t);else if("edit"===this.newItemSubmit.getAttribute("btn-type")){let o=this.newItemSubmit.getAttribute("item-id");this.projectsModel.editItem(e,i,s,n,!1,r,o),this.renderProject(t)}}))}renderItems(t){let e=JSON.parse(localStorage.getItem("projects")).find((e=>e.id===t)).todos;e.length>0&&e.forEach((t=>{this.itemContainerDiv=document.createElement("div"),this.itemContainerDiv.classList.add("items-container"),this.item=document.createElement("div"),this.item.classList.add("item"),this.itemOptionsDiv=document.createElement("div"),this.itemOptionsDiv.classList.add("item-options"),this.itemOptionsDiv.style.display="none",this.itemEditIcon=document.createElement("i"),this.itemEditIcon.classList.add("far","fa-edit","item-options-icon"),this.itemEditSection=document.createElement("div"),this.itemEditSection.classList.add("item-edit"),this.itemEditSection.setAttribute("dataset-id",t.id),this.itemDeleteSection=document.createElement("div"),this.itemDeleteSection.classList.add("delete-item"),this.itemDeleteIcon=document.createElement("i"),this.itemDeleteIcon.classList.add("far","fa-trash-alt","item-options-icon"),this.itemDeleteSection.setAttribute("item-id",t.id),this.itemTitleDiv=document.createElement("div"),this.itemTitleDiv.classList.add("item-title"),this.itemTitleDiv.innerText=t.title,this.itemTitleDiv.setAttribute("dataset-id",t.id),this.itemRowBr=document.createElement("br"),this.dueDateDiv=document.createElement("div"),this.dueDateDiv.classList.add("due-date"),this.dueDateDiv.innerText=t.dueDate,this.itemHr=document.createElement("hr"),this.completionBox=document.createElement("input"),this.completionBox.type="checkbox",this.completionBox.classList.add("item-completion-status-box"),this.completionBox.setAttribute("item-id",t.id),this.completionBox.name="item-status",this.contentBodyDiv.appendChild(this.itemContainerDiv),this.itemContainerDiv.appendChild(this.item),this.item.appendChild(this.itemOptionsDiv),this.itemDeleteSection.appendChild(this.itemDeleteIcon),this.itemEditSection.appendChild(this.itemEditIcon),this.itemOptionsDiv.appendChild(this.itemEditSection),this.itemOptionsDiv.appendChild(this.itemDeleteSection),this.item.appendChild(this.completionBox),this.item.appendChild(this.itemTitleDiv),this.item.appendChild(this.itemRowBr),this.item.appendChild(this.dueDateDiv),this.itemContainerDiv.appendChild(this.itemHr),!0===t.completionStatus?(this.completionBox.checked=!0,this.itemContainerDiv.classList.add("completed-item")):(this.completionBox.checked=!1,this.itemContainerDiv.classList.remove("completed-item")),"High"===t.priority?this.dueDateDiv.classList.add("priority-high"):"Medium"===t.priority?this.dueDateDiv.classList.add("priority-medium"):"Low"===t.priority&&this.dueDateDiv.classList.add("priority-low")}))}itemForm(){const t=["High","Medium","Low"];this.formContainer=document.createElement("div"),this.formContainer.classList.add("new-item-form"),this.formHeader=document.createElement("div"),this.formHeader.classList.add("form-header"),this.formHeaderSpan=document.createElement("span"),this.formHeaderSpan.innerText="New Item",this.formHeaderSpan.classList.add("form-header-span"),this.closeForm=document.createElement("div"),this.closeForm.classList.add("close-form"),this.closeFormIcon=document.createElement("i"),this.closeFormIcon.classList.add("fas","fa-times","close-form-icon"),this.newItemForm=document.createElement("form"),this.itemTitleInput=document.createElement("input"),this.itemTitleInput.type="text",this.itemTitleInput.name="item-name-input",this.itemTitleInput.placeholder="Title: Example Item",this.itemTitleInput.classList.add("item-name-input"),this.itemDescInput=document.createElement("textarea"),this.itemDescInput.wrap="soft",this.itemDescInput.placeholder="Item Description...",this.itemDescInput.classList.add("item-desc-input"),this.prioritySelection=document.createElement("select"),this.prioritySelection.classList.add("priority-selection"),this.prioritySelection.name="priorities",this.itemDueDateInput=document.createElement("input"),this.itemDueDateInput.type="date",this.itemDueDateInput.classList.add("item-duedate-input"),this.newItemSubmit=document.createElement("input"),this.newItemSubmit.type="submit",this.newItemSubmit.setAttribute("btn-type","new-item"),this.prioOptionDisabled=document.createElement("option"),this.prioOptionDisabled.value="",this.prioOptionDisabled.selected="selected",this.prioOptionDisabled.disabled="disabled",this.prioOptionDisabled.innerText="Select Priority",this.prioritySelection.appendChild(this.prioOptionDisabled),this.contentBodyDiv.appendChild(this.formContainer),this.formContainer.appendChild(this.formHeader),this.formHeader.appendChild(this.formHeaderSpan),this.formHeader.appendChild(this.closeForm),this.closeForm.appendChild(this.closeFormIcon),this.formContainer.appendChild(this.newItemForm),this.newItemForm.appendChild(this.itemTitleInput),this.newItemForm.appendChild(this.itemDescInput),this.newItemForm.appendChild(this.prioritySelection),this.newItemForm.appendChild(this.itemDueDateInput),this.newItemForm.appendChild(this.newItemSubmit);for(let e=0;e<t.length;e++)this.prioOption=document.createElement("option"),this.prioOption.value=t[e],this.prioOption.innerText=t[e],this.prioOption.classList.add("option-text"),this.prioritySelection.appendChild(this.prioOption);this.closeForm.addEventListener("click",(()=>{this.formContainer.style.display="none",this.itemTitleInput.value="",this.itemDescInput.value=""}))}clearChildNodes(t){if("content"===t){if(this.contentDiv.firstElementChild)for(;this.contentContainerDiv.firstElementChild;)this.contentContainerDiv.removeChild(this.contentContainerDiv.firstElementChild);for(;this.contentDiv.firstElementChild;)this.contentDiv.removeChild(this.contentDiv.firstElementChild);"content"===this.containerDiv.lastElementChild.id&&this.containerDiv.removeChild(this.contentDiv)}else if("items"===t){for(;this.itemOptionsDiv.firstElementChild;)this.itemOptionsDiv.removeChild(this.itemOptionsDiv.firstElementChild);for(;this.item.firstElementChild;)this.item.removeChild(this.item.firstElementChild);for(;this.itemContainerDiv.firstElementChild;)this.itemContainerDiv.removeChild(this.itemContainerDiv.firstElementChild)}else if("sidebar"===t){for(;this.addProjectBtn.firstElementChild;)this.addProjectBtn.removeChild(this.addProjectBtn.firstElementChild);for(;this.userProjectsUl.firstElementChild;)this.userProjectsUl.removeChild(this.userProjectsUl.firstElementChild);for(;this.logoDiv.firstElementChild;)this.logoDiv.removeChild(this.logoDiv.firstElementChild);for(;this.sidebarContainerDiv.firstElementChild;)this.sidebarContainerDiv.removeChild(this.sidebarContainerDiv.firstElementChild);for(;this.sidebarDiv.firstElementChild;)this.sidebarDiv.removeChild(this.sidebarDiv.firstElementChild);this.containerDiv.removeChild(this.sidebarDiv),this.createSidebar()}else if("all"===t)for(;this.containerDiv.firstElementChild;)this.containerDiv.removeChild(this.containerDiv.firstElementChild)}}})()})();