const content = document.querySelector('#content');

// Create and render the sidebar
function renderSidebar(projectName, index) {
  const sidebarListOfProjects = document.querySelector('#projects-list');

  const projectSide = createSidebarButton(projectName, index);
  sidebarListOfProjects.appendChild(projectSide);
}

function createSidebarButton(projectName, index) {
  const projectSide = document.createElement('button');
  projectSide.dataset.index = index;
  projectSide.classList.add('project-sidebar');
  projectSide.innerHTML = projectName;
  return projectSide;
}

// Render the main content for a project
function renderMain(projectTitle, index) {
  // Remove the existing project-full section if it exists
  removeExistingProjectFull();

  const projectMainDOM = createProjectFullSection(projectTitle, index);
  content.appendChild(projectMainDOM);
}

function removeExistingProjectFull() {
  const existingProjectFull = document.querySelector('#project-full');
  if (existingProjectFull) {
    content.removeChild(existingProjectFull);
  }
}

function createProjectFullSection(projectTitle, index) {
  const projectMainDOM = document.createElement('section');
  projectMainDOM.id = 'project-full';
  projectMainDOM.dataset.index = index;

  const projectTopRow = createProjectTopRow(projectTitle);
  projectMainDOM.appendChild(projectTopRow);

  const toDosDOM = document.createElement('section');
  toDosDOM.id = 'todos-list';
  projectMainDOM.appendChild(toDosDOM);

  return projectMainDOM;
}

function createProjectTopRow(projectTitle) {
  const projectTopRow = document.createElement('div');
  projectTopRow.id = 'project-top-row';

  const projectTitleDOM = document.createElement('h2');
  projectTitleDOM.innerHTML = projectTitle;
  projectTopRow.appendChild(projectTitleDOM);

  const projectButtonWrapper = createProjectButtonWrapper();
  projectTopRow.appendChild(projectButtonWrapper);

  return projectTopRow;
}

function createProjectButtonWrapper() {
  const projectButtonWrapper = document.createElement('div');
  projectButtonWrapper.id = 'project-buttons';

  const newToDo = createButton('New Task', 'new-todo', 'New task');
  projectButtonWrapper.appendChild(newToDo);

  const editProjectButton = createButton('Edit Project', 'edit-project', 'Edit Project');
  projectButtonWrapper.appendChild(editProjectButton);

  const deleteProjectButton = createButton('X', 'delete-project', 'Delete Project');
  projectButtonWrapper.appendChild(deleteProjectButton);

  return projectButtonWrapper;
}

function createButton(text, id, title) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.title = title;
  return button;
}

// Function to remove a form from the content
function removeForm(form) {
  content.removeChild(form);
}

// Function to disable all buttons on the page
function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.setAttribute('disabled', '');
  });
}

// Function to enable all buttons on the page
function enableButtons(buttons) {
  buttons.forEach((button) => {
    button.removeAttribute('disabled');
  });
}

export {
  renderSidebar,
  renderMain,
  removeForm,
  disableButtons,
  enableButtons,
};