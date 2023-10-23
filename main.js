(()=>{var e={865:()=>{},692:()=>{},75:()=>{},283:()=>{}},t={};function o(n){var c=t[n];if(void 0!==c)return c.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}(()=>{"use strict";(()=>{const e=document.querySelector("#content"),t=document.createElement("section");t.id="sidebar";const o=document.createElement("div");o.id="sidebar-top-wrapper";const n=document.createElement("h2");n.innerHTML="Projects",o.appendChild(n);const c=document.createElement("button");c.innerHTML="New Project",c.id="new-project",o.appendChild(c);const r=document.createElement("section");r.id="projects-list",t.appendChild(o),t.appendChild(r),e.appendChild(t)})();const e=(e,t)=>{const o=document.querySelector("#projects-list"),n=document.createElement("button");n.dataset.index=t,n.classList.add("project-sidebar"),n.innerHTML=e,o.appendChild(n)},t=(e,t,o)=>{document.querySelector("#project-full")&&e.removeChild(document.querySelector("#project-full"));const n=document.createElement("section");n.id="project-full",n.dataset.index=o;const c=document.createElement("div");c.id="project-top-row";const r=document.createElement("h2");r.innerHTML=t,c.appendChild(r);const d=document.createElement("div");d.id="project-buttons";const i=document.createElement("button");i.innerHTML="New Task",i.id="new-todo",i.setAttribute("title","New task"),d.appendChild(i);const s=document.createElement("button");s.id="edit-project",s.classList.add("edit-button"),s.setAttribute("title","Edit Project"),s.innerHTML="Edit Project",d.appendChild(s);const l=document.createElement("button");l.id="delete-project",l.classList.add("delete-button"),l.setAttribute("title","Delete Project"),l.innerHTML="X",d.appendChild(l),c.appendChild(d),n.appendChild(c);const u=document.createElement("section");u.id="todos-list",n.appendChild(u),e.appendChild(n)},n=(e,t)=>{e.removeChild(t)},c=e=>{e.forEach((e=>{e.setAttribute("disabled","")}))},r=e=>{e.forEach((e=>{e.removeAttribute("disabled")}))};var d=o(283),i=o(865),s=o(692),l=o(75);const u=document.querySelector("#content"),a=document.querySelector("#sidebar");let m=(0,l.getProjects)("projectsList",[],Project("My first project"));function p(e){const t=document.querySelector("#todos-list"),o=m[e];t.innerHTML="",o.todos.forEach(((e,o)=>{(0,s.renderToDo)(t,e.title,e.description,e.dueDate,e.priority,o,e.status)}))}function j(){a.innerHTML="",m.forEach(((t,o)=>{e(t.name,o)}))}a.onclick=o=>{!function(o){if(o.hasAttribute("data-index")){const e=o.dataset.index;t(u,m[e].name,e),p(e)}else if("new-project"===o.id){c(document.querySelectorAll("button")),(0,i.showProjectForm)(u,"Add");const o=document.querySelector("form");o.onsubmit=c=>{c.preventDefault(),n(u,o);const d=Project(o.elements.namedItem("project-title").value);m.push(d),e(d.name,m.indexOf(d)),t(u,d.name,m.indexOf(d)),(0,l.saveProjects)("projectsList",m),r(document.querySelectorAll("button"))},document.querySelector("#cancel-project").onclick=()=>{n(u,o),r(document.querySelectorAll("button"))}}}(o.target)},u.onclick=e=>{!function(e){const o=document.querySelector("#project-full").getAttribute("data-index");if("new-todo"===e.id){c(document.querySelectorAll("button")),(0,s.showToDoForm)(u,"Add");const e=document.querySelector("form");e.onsubmit=t=>{t.preventDefault(),n(u,e);const c=(0,d.toDo)(e.elements.namedItem("todo-title").value,e.elements.namedItem("description").value,e.elements.namedItem("date").value,e.elements.namedItem("priority").value);m[o].todos.push(c),(0,s.renderToDo)(document.querySelector("#todos-list"),c.title,c.description,c.dueDate,c.priority,m[o].todos.length-1,c.status),(0,l.saveProjects)("projectsList",m),r(document.querySelectorAll("button"))},document.querySelector("#cancel-todo").onclick=()=>{n(u,e),r(document.querySelectorAll("button"))}}else if(e.classList.contains("expand-todo"))(0,s.expandToDo)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`));else if(e.classList.contains("edit-todo")){const t=e.getAttribute("data-index"),d=document.querySelectorAll("button");c(d),(0,s.showToDoForm)(u,"Edit",m[o].todos[t].title,m[o].todos[t].description,m[o].todos[t].dueDate,m[o].todos[t].priority);const i=document.querySelector("form");i.onsubmit=c=>{c.preventDefault(),n(u,i);const a=m[o].todos[t];a.title=i.elements.namedItem("todo-title").value,a.description=i.elements.namedItem("description").value,a.dueDate=i.elements.namedItem("date").value,a.priority=i.elements.namedItem("priority").value,(0,s.editToDo)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`),a.title,a.description,a.dueDate,a.priority),(0,l.saveProjects)("projectsList",m),r(d)},document.querySelector("#cancel-todo").onclick=()=>{n(u,i),r(d)}}else if(e.classList.contains("check-todo")){const t=e.getAttribute("data-index"),n=m[o].todos[t];n.status=(0,d.toggleStatus)(n.status),(0,s.toggleTodoStatusClass)(document.querySelector(`[data-index="${e.getAttribute("data-index")}"]`)),(0,l.saveProjects)("projectsList",m)}else if(e.classList.contains("delete-todo")){const t=e.getAttribute("data-index");deleteToDo(m[o].todos,t),p(o),(0,l.saveProjects)("projectsList",m)}else if("edit-project"===e.id){c(document.querySelectorAll("button")),(0,i.showProjectForm)(u,"Edit",m[o].name);const e=document.querySelector("form");e.onsubmit=t=>{t.preventDefault(),n(u,e),m[o].name=e.elements.namedItem("project-title").value,(0,i.updateProjectName)(document.querySelector(`[data-index="${o}"]`),m[o].name),(0,i.updateProjectName)(document.querySelector("#project-top-row h2"),m[o].name),(0,l.saveProjects)("projectsList",m),r(document.querySelectorAll("button"))},document.querySelector("#cancel-project").onclick=()=>{n(u,e),r(document.querySelectorAll("button"))}}else if("delete-project"===e.id){const e=document.querySelector("#project-full").dataset.index;((e,t)=>{e.splice(t,1)})(m,e),j(),m.length>0?(t(u,m[0].name,0),p(0)):u.removeChild(document.querySelector("#project-full")),(0,l.saveProjects)("projectsList",m)}}(e.target)},j(),m.length>0&&(t(u,m[0].name,0),p(0))})()})();