// DOM Elements
const content = document.querySelector('#content');
const sidebar = document.createElement('section');
sidebar.id = 'sidebar';
const sidebarTopWrapper = document.createElement('div');
sidebarTopWrapper.id = 'sidebar-top-wrapper';
const sidebarTitle = document.createElement('h2');
sidebarTitle.innerHTML = 'Projects';
const newProject = document.createElement('button');
newProject.innerHTML = 'New Project';
newProject.id = 'new-project';
const sidebarListOfProjects = document.createElement('section');
sidebarListOfProjects.id = 'projects-list';

// Render Sidebar
const renderSidebar = (projectName, index) => {
    const projectSide = document.createElement('button');
    projectSide.dataset.index = index;
    projectSide.classList.add('project-sidebar');
    projectSide.innerHTML = projectName;
    sidebarListOfProjects.appendChild(projectSide);
};

// Render Main Content
const renderMain = (projectTitle, index) => {
    // Remove existing project content if any
    const existingProject = document.querySelector('#project-full');
    if (existingProject) {
        content.removeChild(existingProject);
    }

    // Create new project content
    const projectMainDOM = document.createElement('section');
    projectMainDOM.id = 'project-full';
    projectMainDOM.dataset.index = index;

    const projectTopRow = document.createElement('div');
    projectTopRow.id = 'project-top-row';

    const projectTitleDOM = document.createElement('h2');
    projectTitleDOM.innerHTML = projectTitle;
    projectTopRow.appendChild(projectTitleDOM);

    const projectButtonWrapper = document.createElement('div');
    projectButtonWrapper.id = 'project-buttons';

    // Create "New Task" button
    const newToDo = createButton('New Task', 'new-todo', 'New task');

    // Create "Edit Project" button
    const editProjectButton = createButton('Edit Project', 'edit-project', 'Edit Project', 'edit-button');

    // Create "Delete Project" button
    const deleteProjectButton = createButton('X', 'delete-project', 'Delete Project', 'delete-button');

    // Append buttons to the button wrapper
    projectButtonWrapper.appendChild(newToDo);
    projectButtonWrapper.appendChild(editProjectButton);
    projectButtonWrapper.appendChild(deleteProjectButton);

    // Append button wrapper to the project top row
    projectTopRow.appendChild(projectButtonWrapper);
    projectMainDOM.appendChild(projectTopRow);

    // Create "To-Dos" section
    const toDosDOM = document.createElement('section');
    toDosDOM.id = 'todos-list';
    projectMainDOM.appendChild(toDosDOM);

    // Append the new project content to the page
    content.appendChild(projectMainDOM);
};

// Create a button element
function createButton(text, id, title, className) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.id = id;
    if (title) button.setAttribute('title', title);
    if (className) button.classList.add(className);
    return button;
}

// Function to remove a form element
const removeForm = (form) => {
    form.remove();
};

// Function to disable buttons
const disableButtons = (buttons) => {
    buttons.forEach((button) => {
        button.setAttribute('disabled', '');
    });
};

// Function to enable buttons
const enableButtons = (buttons) => {
    buttons.forEach((button) => {
        button.removeAttribute('disabled');
    });
};

// Initial page rendering
const renderPage = (() => {
    sidebarTopWrapper.appendChild(sidebarTitle);
    sidebarTopWrapper.appendChild(newProject);
    sidebar.appendChild(sidebarTopWrapper);
    sidebar.appendChild(sidebarListOfProjects);
    content.appendChild(sidebar);
})();

export {
    renderPage,
    renderSidebar,
    renderMain,
    removeForm,
    disableButtons,
    enableButtons,
};