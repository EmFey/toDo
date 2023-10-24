import {
    renderPage,
    renderSidebar,
    renderMain,
    removeForm,
    disableButtons,
    enableButtons,
  } from './render-page';
  import { Project, deleteToDo, deleteProject } from './project-logic';
  import { toDo, toggleStatus } from './todo-logic';
  import { showProjectForm, updateProjectName } from './render-project';
  import {
    showToDoForm,
    renderToDo,
    expandToDo,
    editToDo,
    toggleTodoStatusClass,
  } from './render-todo';
  import { saveProjects, getProjects } from './storage-functions';
  
  const PageController = (() => {
    const content = document.querySelector('#content');
    const sidebar = document.querySelector('#sidebar');
    let projectsList = getProjects(
      'projectsList',
      [],
      Project('My first project')
    );
  
    function initializePage() {
      renderFirstProject();
      renderSidebarProjects();
      setupSidebarClickHandler();
      setupContentClickHandler();
    }
  
    function renderFirstProject() {
      const firstProject = projectsList[0];
      renderMain(content, firstProject.name, 0);
      firstProject.todos.forEach((todo, index) => {
        renderToDo(content.querySelector('#todos-list'), todo, index);
      });
    }
  
    function renderSidebarProjects() {
      projectsList.forEach((project, index) => {
        renderSidebar(project.name, index);
      });
    }
  
    function setupSidebarClickHandler() {
      sidebar.addEventListener('click', (e) => {
        handleSidebarClick(e);
      });
    }
  
    function handleSidebarClick(e) {
      const target = e.target;
      if (target.hasAttribute('data-index')) {
        renderSelectedProject(target);
      } else if (target.id === 'new-project') {
        createNewProject();
      }
    }
  
    function renderSelectedProject(selectedProjectButton) {
      const projectIndex = selectedProjectButton.dataset.index;
      renderMain(content, projectsList[projectIndex].name, projectIndex);
      projectsList[projectIndex].todos.forEach((todo) => {
        renderToDo(content.querySelector('#todos-list'), todo);
      });
    }
  
    function createNewProject() {
      disableButtons(document.querySelectorAll('button'));
      showProjectForm(content, 'Add');
  
      const form = document.querySelector('form');
      form.onsubmit = (submission) => {
        submission.preventDefault();
        const newProjectName = form.elements.namedItem('project-title').value;
        const newProject = Project(newProjectName);
        projectsList.push(newProject);
        renderSidebar(newProjectName, projectsList.indexOf(newProject));
        renderSelectedProject({ dataset: { index: projectsList.indexOf(newProject) } });
        saveProjects('projectsList', projectsList);
        enableButtons(document.querySelectorAll('button'));
      };
  
      document.querySelector('#cancel-project').onclick = () => {
        removeForm(content, form);
        enableButtons(document.querySelectorAll('button'));
      };
    }
  
    function setupContentClickHandler() {
      content.addEventListener('click', (e) => {
        handleContentClick(e);
      });
    }
  
    function handleContentClick(e) {
      const target = e.target;
      const projectIndex = content.querySelector('#project-full').getAttribute('data-index');
  
      if (target.id === 'new-todo') {
        createNewTodo();
      } else if (target.classList.contains('expand-todo')) {
        expandToDo(content.querySelector(`[data-index="${target.dataset.index}"]`));
      } else if (target.classList.contains('edit-todo')) {
        editTodoForm(target, projectIndex);
      } else if (target.classList.contains('check-todo')) {
        updateTodoStatus(target, projectIndex);
      } else if (target.classList.contains('delete-todo')) {
        deleteTodo(target, projectIndex);
      } else if (target.id === 'edit-project') {
        editProjectForm(projectIndex);
      } else if (target.id === 'delete-project') {
        deleteProjectAction(projectIndex);
      }
    }
  
    function createNewTodo() {
      disableButtons(document.querySelectorAll('button'));
      showToDoForm(content, 'Add');
  
      const form = document.querySelector('form');
      form.onsubmit = (submission) => {
        submission.preventDefault();
        const newTodo = toDo(
          form.elements.namedItem('todo-title').value,
          form.elements.namedItem('description').value,
          form.elements.namedItem('date').value,
          form.elements.namedItem('priority').value
        );
        projectsList[projectIndex].todos.push(newTodo);
        renderToDo(content.querySelector('#todos-list'), newTodo);
        saveProjects('projectsList', projectsList);
        enableButtons(document.querySelectorAll('button'));
      };
  
      document.querySelector('#cancel-todo').onclick = () => {
        removeForm(content, form);
        enableButtons(document.querySelectorAll('button'));
      };
    }
  
    function editTodoForm(target, projectIndex) {
      disableButtons(document.querySelectorAll('button'));
      const todoIndex = target.dataset.index;
      const todoToEdit = projectsList[projectIndex].todos[todoIndex];
  
      showToDoForm(content, 'Edit', todoToEdit);
      const form = document.querySelector('form');
      form.onsubmit = (submission) => {
        submission.preventDefault();
        const updatedTodo = {
          title: form.elements.namedItem('todo-title').value,
          description: form.elements.namedItem('description').value,
          date: form.elements.namedItem('date').value,
          priority: form.elements.namedItem('priority').value,
        };
        projectsList[projectIndex].todos[todoIndex] = updatedTodo;
        editToDo(content.querySelector(`[data-index="${target.dataset.index}"]`), updatedTodo);
        saveProjects('projectsList', projectsList);
        enableButtons(document.querySelectorAll('button'));
      };
  
      document.querySelector('#cancel-todo').onclick = () => {
        removeForm(content, form);
        enableButtons(document.querySelectorAll('button'));
      };
    }
  
    function updateTodoStatus(target, projectIndex) {
      const todoIndex = target.dataset.index;
      projectsList[projectIndex].todos[todoIndex].status = toggleStatus(projectsList[projectIndex].todos[todoIndex].status);
      toggleTodoStatusClass(content.querySelector(`[data-index="${target.dataset.index}"]`));
      saveProjects('projectsList', projectsList);
    }
  
    function deleteTodo(target, projectIndex) {
      const todoIndex = target.dataset.index;
      deleteToDo(projectsList[projectIndex].todos, todoIndex);
      content.querySelector('#todos-list').innerHTML = '';
      projectsList[projectIndex].todos.forEach((todo, index) => {
        renderToDo(content.querySelector('#todos-list'), todo);
      });
      saveProjects('projectsList', projectsList);
    }
  
    function editProjectForm(projectIndex) {
      disableButtons(document.querySelectorAll('button'));
      showProjectForm(content, 'Edit', projectsList[projectIndex].name);
      const form = document.querySelector('form');
      form.onsubmit = (submission) => {
        submission.preventDefault();
        projectsList[projectIndex].name = form.elements.namedItem('project-title').value;
        updateProjectName(sidebar.querySelector(`[data-index="${projectIndex}"]`), projectsList[projectIndex].name);
        updateProjectName(content.querySelector('#project-top-row h2'), projectsList[projectIndex].name);
        saveProjects('projectsList', projectsList);
        enableButtons(document.querySelectorAll('button'));
      };
  
      document.querySelector('#cancel-project').onclick = () => {
        removeForm(content, form);
        enableButtons(document.querySelectorAll('button'));
      };
    }
  
    function deleteProjectAction(projectIndex) {
      deleteProject(projectsList, projectIndex);
      sidebar.querySelectorAll('.project-sidebar').forEach((n) => n.remove());
      renderSidebarProjects();
  
      if (projectsList.length > 0) {
        renderMain(content, projectsList[0].name, 0);
        projectsList[0].todos.forEach((todo) => {
          renderToDo(content.querySelector('#todos-list'), todo);
        });
      } else {
        content.removeChild(content.querySelector('#project-full'));
      }
  
      saveProjects('projectsList', projectsList);
    }
  
    initializePage();
  })();