(()=>{var e={692:()=>{},75:()=>{},283:()=>{}},t={};function o(n){var c=t[n];if(void 0!==c)return c.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}(()=>{"use strict";(()=>{const e=document.querySelector("#content"),t=document.createElement("section");t.id="sidebar";const o=document.createElement("div");o.id="sidebar-top-wrapper";const n=document.createElement("h2");n.innerHTML="Projects",o.appendChild(n);const c=document.createElement("button");c.innerHTML="New Project",c.id="new-project",o.appendChild(c);const r=document.createElement("section");r.id="projects-list",t.appendChild(o),t.appendChild(r),e.appendChild(t)})();const e=(e,t)=>{const o=document.querySelector("#projects-list"),n=document.createElement("button");n.dataset.index=t,n.classList.add("project-sidebar"),n.innerHTML=e,o.appendChild(n)},t=(e,t,o)=>{document.querySelector("#project-full")&&e.removeChild(document.querySelector("#project-full"));const n=document.createElement("section");n.id="project-full",n.dataset.index=o;const c=document.createElement("div");c.id="project-top-row";const r=document.createElement("h2");r.innerHTML=t,c.appendChild(r);const d=document.createElement("div");d.id="project-buttons";const i=document.createElement("button");i.innerHTML="New Task",i.id="new-todo",i.setAttribute("title","New task"),d.appendChild(i);const l=document.createElement("button");l.id="edit-project",l.classList.add("edit-button"),l.setAttribute("title","Edit Project"),l.innerHTML="Edit Project",d.appendChild(l);const s=document.createElement("button");s.id="delete-project",s.classList.add("delete-button"),s.setAttribute("title","Delete Project"),s.innerHTML="X",d.appendChild(s),c.appendChild(d),n.appendChild(c);const a=document.createElement("section");a.id="todos-list",n.appendChild(a),e.appendChild(n)},n=(e,t)=>{e.removeChild(t)},c=e=>{e.forEach((e=>{e.setAttribute("disabled","")}))},r=e=>{e.forEach((e=>{e.removeAttribute("disabled")}))};var d=o(283);const i=(e,t={})=>{const o=document.createElement(e);for(const[e,n]of Object.entries(t))o.setAttribute(e,n);return o},l=(e,t,o)=>{const n=i("form",{id:"project-form"}),c=i("h3");c.textContent=`${t} Project`,n.appendChild(c);const r=i("label",{for:"project-title",textContent:"Project Title"});n.appendChild(r);const d=i("input",{name:"project-title",type:"text",placeholder:"Project Title",required:"",value:o||""});n.appendChild(d);const l=i("button",{type:"submit",id:"submit-project",textContent:`${t} Project`});n.appendChild(l);const s=i("button",{type:"button",id:"cancel-project",textContent:"Cancel"});n.appendChild(s),e.appendChild(n)},s=(e,t)=>{e.textContent=t};var a=o(692),u=o(75);const m=document.querySelector("#content"),p=document.querySelector("#sidebar");let j=(0,u.getProjects)("projectsList",[],Project("My first project"));function b(e){const t=document.querySelector("#todos-list"),o=j[e];t.innerHTML="",o.todos.forEach(((e,o)=>{(0,a.renderToDo)(t,e.title,e.description,e.dueDate,e.priority,o,e.status)}))}function y(){p.innerHTML="",j.forEach(((t,o)=>{e(t.name,o)}))}p.onclick=o=>{!function(o){if(o.hasAttribute("data-index")){const e=o.dataset.index;t(m,j[e].name,e),b(e)}else if("new-project"===o.id){c(document.querySelectorAll("button")),l(m,"Add");const o=document.querySelector("form");o.onsubmit=c=>{c.preventDefault(),n(m,o);const d=Project(o.elements.namedItem("project-title").value);j.push(d),e(d.name,j.indexOf(d)),t(m,d.name,j.indexOf(d)),(0,u.saveProjects)("projectsList",j),r(document.querySelectorAll("button"))},document.querySelector("#cancel-project").onclick=()=>{n(m,o),r(document.querySelectorAll("button"))}}}(o.target)},m.onclick=e=>{!function(e){const o=document.querySelector("#project-full").getAttribute("data-index");if("new-todo"===e.id){c(document.querySelectorAll("button")),(0,a.showToDoForm)(m,"Add");const e=document.querySelector("form");e.onsubmit=t=>{t.preventDefault(),n(m,e);const c=(0,d.toDo)(e.elements.namedItem("todo-title").value,e.elements.namedItem("description").value,e.elements.namedItem("date").value,e.elements.namedItem("priority").value);j[o].todos.push(c),(0,a.renderToDo)(document.querySelector("#todos-list"),c.title,c.description,c.dueDate,c.priority,j[o].todos.length-1,c.status),(0,u.saveProjects)("projectsList",j),r(document.querySelectorAll("button"))},document.querySelector("#cancel-todo").onclick=()=>{n(m,e),r(document.querySelectorAll("button"))}}else if(e.classList.contains("expand-todo"))(0,a.expandToDo)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`));else if(e.classList.contains("edit-todo")){const t=e.getAttribute("data-index"),d=document.querySelectorAll("button");c(d),(0,a.showToDoForm)(m,"Edit",j[o].todos[t].title,j[o].todos[t].description,j[o].todos[t].dueDate,j[o].todos[t].priority);const i=document.querySelector("form");i.onsubmit=c=>{c.preventDefault(),n(m,i);const l=j[o].todos[t];l.title=i.elements.namedItem("todo-title").value,l.description=i.elements.namedItem("description").value,l.dueDate=i.elements.namedItem("date").value,l.priority=i.elements.namedItem("priority").value,(0,a.editToDo)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`),l.title,l.description,l.dueDate,l.priority),(0,u.saveProjects)("projectsList",j),r(d)},document.querySelector("#cancel-todo").onclick=()=>{n(m,i),r(d)}}else if(e.classList.contains("check-todo")){const t=e.getAttribute("data-index"),n=j[o].todos[t];n.status=(0,d.toggleStatus)(n.status),(0,a.toggleTodoStatusClass)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`)),(0,u.saveProjects)("projectsList",j)}else if(e.classList.contains("delete-todo")){const t=e.getAttribute("data-index");deleteToDo(j[o].todos,t),b(o),(0,u.saveProjects)("projectsList",j)}else if("edit-project"===e.id){c(document.querySelectorAll("button")),l(m,"Edit",j[o].name);const e=document.querySelector("form");e.onsubmit=t=>{t.preventDefault(),n(m,e),j[o].name=e.elements.namedItem("project-title").value,s(document.querySelector(`[data-index="${o}"]`),j[o].name),s(document.querySelector("#project-top-row h2"),j[o].name),(0,u.saveProjects)("projectsList",j),r(document.querySelectorAll("button"))},document.querySelector("#cancel-project").onclick=()=>{n(m,e),r(document.querySelectorAll("button"))}}else if("delete-project"===e.id){const e=document.querySelector("#project-full").dataset.index;((e,t)=>{e.splice(t,1)})(j,e),y(),j.length>0?(t(m,j[0].name,0),b(0)):m.removeChild(document.querySelector("#project-full")),(0,u.saveProjects)("projectsList",j)}}(e.target)},y(),j.length>0&&(t(m,j[0].name,0),b(0))})()})();