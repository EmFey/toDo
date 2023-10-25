import Projects from "./projects";
import { format } from 'date-fns';

class DisplayController {
    constructor() {
        this.appDiv = document.getElementById("app");
        this.projectsModel = new Projects();

        this.containerDiv = this.createElement("div", "container");
        this.contentDiv = this.createElement("div", "content");
        this.appDiv.appendChild(this.containerDiv);

        this.createSidebar();
        this.projects = JSON.parse(localStorage.getItem("projects"));
        this.renderProject(this.projects[0].id);
        console.log(this.projectsModel);
    }

    createElement(tagName, id) {
        const element = document.createElement(tagName);
        if (id) element.id = id;
        return element;
    }

    createButton(text, classNames, clickHandler) {
        const button = this.createElement("button");
        button.textContent = text;
        button.classList.add(...classNames);
        button.addEventListener("click", clickHandler);
        return button;
    }

    createSidebar() {
        this.sidebarDiv = this.createElement("div", "sidebar");
        this.logoDiv = this.createElement("div", "logo");
        this.logoImage = this.createElement("i");
        this.logoHR = this.createElement("hr");
        this.addProjectBtn = this.createButton("Add Project", ["add-project-btn"], () => this.handleAddProjectBtnClick());
        this.sidebarHR = this.createElement("hr", "sidebar-container-hr");
        this.sidebarContainerDiv = this.createElement("div", "sidebar-container");
        this.userProjectsUl = this.createElement("ul", "user-projects");

        this.logoImage.classList.add("logo-icon", "fas", "fa-th-list", "fa-2x");
        this.logoImage.textContent = "TODO LIST";

        this.containerDiv.appendChild(this.sidebarDiv);
        this.sidebarDiv.appendChild(this.logoDiv);
        this.logoDiv.appendChild(this.logoImage);
        this.logoDiv.appendChild(this.logoHR);
        this.sidebarContainerDiv.appendChild(this.addProjectBtn);
        this.sidebarDiv.appendChild(this.sidebarContainerDiv);
        this.sidebarContainerDiv.appendChild(this.userProjectsUl);

        this.renderProjectList(JSON.parse(localStorage.getItem('projects')));

        this.handleProjectClickEvents();
    }

    handleAddProjectBtnClick() {
        const projectTitle = prompt("Project Title: ");
        if (projectTitle) {
            this.projectsModel.createProject(projectTitle);
            const updatedProjects = JSON.parse(localStorage.getItem('projects'));
            this.renderProject(updatedProjects[updatedProjects.length - 1].id);
            this.clearChildNodes("sidebar");
        }
    }

    handleProjectClickEvents() {
        const userProjects = document.querySelectorAll(".project");

        userProjects.forEach(project => {
            project.addEventListener("click", event => {
                userProjects.forEach(project => {
                    project.classList.remove("project-active");
                });
                this.renderProject(event.target.dataset.id);
                project.classList.add("project-active");
            });
        });
    }

    renderProjectList(projects) {
        if (projects) {
            projects.forEach(project => {
                const projectLi = this.createElement("li", null);
                projectLi.classList.add("project");
                projectLi.setAttribute("data-id", project.id);
                projectLi.textContent = project.title;
                this.userProjectsUl.appendChild(projectLi);
            });
        }
    }

    renderProject(projId) {
        const updatedProjects = JSON.parse(localStorage.getItem('projects'));
        const project = updatedProjects.find(p => p.id === projId);
        const currentProj = projId;

        this.clearChildNodes("content");
        this.contentContainerDiv = this.createElement("div", "content-container");
        this.contentHeaderDiv = this.createElement("div", "content-header");
        this.currentTitleSpan = this.createElement("span", "current-project-title");
        this.projectSettingsDiv = this.createElement("div", "settings-icon");
        this.projectSettingsIcon = this.createElement("i");
        this.contentBodyDiv = this.createElement("div", "content-body");
        this.itemDiv = this.createElement("div", "items");
        this.addItemBtnDiv = this.createElement("div", "add-item-btn");
        this.addItemIco = this.createElement("i", null);
        this.addItemSpan = this.createElement("span", "add-item-text");

        this.currentTitleSpan.innerText = project.title;
        this.currentTitleSpan.setAttribute("data-id", projId);

        this.containerDiv.appendChild(this.contentDiv);
        this.contentDiv.appendChild(this.contentContainerDiv);
        this.contentContainerDiv.appendChild(this.contentHeaderDiv);
        this.contentHeaderDiv.appendChild(this.currentTitleSpan);
        this.projectSettingsDiv.appendChild(this.projectSettingsIcon);
        this.contentHeaderDiv.appendChild(this.projectSettingsDiv);
        this.contentContainerDiv.appendChild(this.contentBodyDiv);

        this.renderItems(projId);

        this.contentBodyDiv.appendChild(this.addItemBtnDiv);
        this.addItemBtnDiv.appendChild(this.addItemIco);
        this.addItemSpan.innerText = "Add Item";
        this.addItemBtnDiv.appendChild(this.addItemSpan);

        this.handleItemForm();
        this.handleDeleteItemIcons(projId);
        this.handleProjectSettings(projId);
        this.handleEditItemIcons(projId);
        this.handleCompletionBoxes(projId);
    }

    renderItems(projId) {
        const updatedProjects = JSON.parse(localStorage.getItem('projects'));
        const projItems = updatedProjects.find(p => p.id === projId).todos;

        if (projItems.length > 0) {
            projItems.forEach(item => {
                const itemContainerDiv = this.createElement("div", "items-container");
                const item = this.createElement("div", "item");
                const itemOptionsDiv = this.createElement("div", "item-options");
                const itemEditIcon = this.createElement("i", "item-edit");
                const itemDeleteSection = this.createElement("div", "delete-item");
                const itemDeleteIcon = this.createElement("i");
                const itemTitleDiv = this.createElement("div", "item-title");
                const dueDateDiv = this.createElement("div", "due-date");
                const completionBox = this.createElement("input");
                const itemRowBr = this.createElement("br");
                const itemHr = this.createElement("hr");
                const priority = item.priority.toLowerCase();

                itemOptionsDiv.style.display = "none";

                itemEditIcon.classList.add("far", "fa-edit", "item-options-icon");
                itemEditIcon.setAttribute("dataset-id", item.id);

                itemDeleteIcon.classList.add("far", "fa-trash-alt", "item-options-icon");
                itemDeleteSection.setAttribute("item-id", item.id);

                itemTitleDiv.innerText = item.title;
                itemTitleDiv.setAttribute("dataset-id", item.id);

                dueDateDiv.innerText = item.dueDate;

                completionBox.type = "checkbox";
                completionBox.classList.add("item-completion-status-box");
                completionBox.setAttribute("item-id", item.id);
                completionBox.name = "item-status";

                this.contentBodyDiv.appendChild(itemContainerDiv);
                itemContainerDiv.appendChild(item);
                item.appendChild(itemOptionsDiv);
                itemOptionsDiv.appendChild(itemEditIcon);
                itemOptionsDiv.appendChild(itemDeleteSection);
                item.appendChild(completionBox);
                item.appendChild(itemTitleDiv);
                item.appendChild(itemRowBr);
                item.appendChild(dueDateDiv);
                itemContainerDiv.appendChild(itemHr);

                if (item.completionStatus) {
                    completionBox.checked = true;
                    itemContainerDiv.classList.add("completed-item");
                } else {
                    completionBox.checked = false;
                    itemContainerDiv.classList.remove("completed-item");
                }

                if (priority) {
                    dueDateDiv.classList.add(`priority-${priority}`);
                }
            });
        }
    }

    handleItemForm() {
        const priorities = ["High", "Medium", "Low"];

        this.formContainer = this.createElement("div", "new-item-form");
        this.formHeader = this.createElement("div", "form-header");
        this.formHeaderSpan = this.createElement("span", "form-header-span");
        this.formHeaderSpan.innerText = "New Item";
        this.closeForm = this.createElement("div", "close-form");
        this.closeFormIcon = this.createElement("i", "close-form-icon");
        this.newItemForm = this.createElement("form");
        this.itemTitleInput = this.createElement("input", "item-name-input");
        this.itemTitleInput.type = "text";
        this.itemTitleInput.placeholder = "Title: Example Item";
        this.itemDescInput = this.createElement("textarea", "item-desc-input");
        this.itemDescInput.wrap = "soft";
        this.itemDescInput.placeholder = "Item Description...";
        this.prioritySelection = this.createElement("select", "priority-selection");
        this.itemDueDateInput = this.createElement("input", "item-duedate-input");
        this.itemDueDateInput.type = "date";
        this.newItemSubmit = this.createElement("input", null);
        this.newItemSubmit.type = "submit";
        this.newItemSubmit.setAttribute("btn-type", "new-item");
        this.prioOptionDisabled = this.createElement("option", null);
        this.prioOptionDisabled.value = "";
        this.prioOptionDisabled.selected = "selected";
        this.prioOptionDisabled.disabled = "disabled";
        this.prioOptionDisabled.innerText = "Select Priority";

        this.contentBodyDiv.appendChild(this.formContainer);
        this.formContainer.appendChild(this.formHeader);
        this.formHeader.appendChild(this.formHeaderSpan);
        this.formHeader.appendChild(this.closeForm);
        this.closeForm.appendChild(this.closeFormIcon);
        this.formContainer.appendChild(this.newItemForm);
        this.newItemForm.appendChild(this.itemTitleInput);
        this.newItemForm.appendChild(this.itemDescInput);
        this.newItemForm.appendChild(this.prioritySelection);
        this.newItemForm.appendChild(this.itemDueDateInput);
        this.newItemForm.appendChild(this.newItemSubmit);

        for (const priority of priorities) {
            const prioOption = this.createElement("option", null);
            prioOption.value = priority;
            prioOption.innerText = priority;
            this.prioritySelection.appendChild(prioOption);
        }

        this.closeForm.addEventListener("click", () => {
            this.formContainer.style.display = "none";
            this.itemTitleInput.value = "";
            this.itemDescInput.value = "";
        });
    }

    handleDeleteItemIcons(projId) {
        const deleteIcons = document.querySelectorAll(".delete-item");
        deleteIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                const workingItemId = icon.getAttribute("item-id");
                this.projectsModel.removeItem(projId, workingItemId);
                this.renderProject(projId);
            });
        });
    }

    handleProjectSettings(projId) {
        this.projectSettingsDiv.addEventListener("click", () => {
            this.projectsModel.removeProject(projId);
            this.clearChildNodes("sidebar");
            this.renderProject(this.projects[0].id);
        });
    }

    handleEditItemIcons(projId) {
        const editIcons = document.querySelectorAll(".item-edit");
        editIcons.forEach(icon => {
            icon.addEventListener("click", event => {
                const allProjects = JSON.parse(localStorage.getItem("projects"));
                const itemId = icon.getAttribute("dataset-id");
                this.formContainer.style.display = "grid";
                const workingProj = allProjects.find(p => p.id === projId);
                const workingItem = workingProj.todos.find(i => i.id === itemId);
                this.formHeaderSpan.innerText = "Edit Item";
                this.itemTitleInput.value = workingItem.title;
                this.itemDescInput.value = workingItem.description;
                this.prioritySelection.value = workingItem.priority;
                this.itemDueDateInput.value = workingItem.dueDate;
                this.newItemSubmit.setAttribute("btn-type", "edit");
                this.newItemSubmit.setAttribute("item-id", itemId);
            });
        });
    }

    handleCompletionBoxes(projId) {
        const completionBoxes = document.getElementsByName("item-status");
        completionBoxes.forEach(box => {
            const itemId = box.getAttribute("item-id");
            const workingProj = this.projects.find(p => p.id === projId);
            const workingItem = workingProj.todos.find(i => i.id === itemId);
            box.addEventListener("click", () => {
                workingItem.completionStatus = box.checked;
                localStorage.setItem("projects", JSON.stringify(this.projects));
                this.clearChildNodes("items");
                this.renderProject(projId);
            });
        });

        this.newItemSubmit.addEventListener("click", () => {
            const title = this.itemTitleInput.value;
            const dueDate = this.itemDueDateInput.value;
            const desc = this.itemDescInput.value;
            const prio = this.prioritySelection.value;
            const projectId = this.currentTitleSpan.dataset.id;
            const completionStatus = false;
            if (this.newItemSubmit.getAttribute("btn-type") === "new") {
                this.projectsModel.addItem(title, dueDate, desc, prio, completionStatus, projectId);
                this.renderProject(projId);
            } else if (this.newItemSubmit.getAttribute("btn-type") === "edit") {
                const itemId = this.newItemSubmit.getAttribute("item-id");
                this.projectsModel.editItem(title, dueDate, desc, prio, completionStatus, projectId, itemId);
                this.renderProject(projId);
            }
        });
    }

    clearChildNodes(area) {
        const clearElement = (element) => {
            while (element.firstElementChild) {
                element.removeChild(element.firstElementChild);
            }
        }

        if (area === "content") {
            clearElement(this.contentContainerDiv);
            clearElement(this.contentDiv);
            if (this.containerDiv.lastElementChild.id === "content") {
                this.containerDiv.removeChild(this.contentDiv);
            }
        } else if (area === "items") {
            clearElement(this.itemOptionsDiv);
            clearElement(this.item);
            clearElement(this.itemContainerDiv);
        } else if (area === "sidebar") {
            clearElement(this.addProjectBtn);
            clearElement(this.userProjectsUl);
            clearElement(this.logoDiv);
            clearElement(this.sidebarContainerDiv);
            clearElement(this.sidebarDiv);
            this.containerDiv.removeChild(this.sidebarDiv);
            this.createSidebar();
        } else if (area === "all") {
            clearElement(this.containerDiv);
        }
    }
}

export default DisplayController;