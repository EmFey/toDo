import {
    renderPage,
    renderSidebar,
    renderMain,
    removeForm,
    disableButtons,
    enableButtons,
} from './loadPage';

import { Project, deleteToDo, deleteProject } from './logic';
import { toDo, toggleStatus } from './todo';
import { showProjectForm, updateProjectName } from './loadProject';
import {
    showToDoForm,
    renderToDo,
    expandToDo,
    editToDo,
    toggleTodoStatusClass,
} from './loadTodo';

import { saveProjects, getProjects } from './storage';

const content = document.querySelector('#content');
const sidebar = document.querySelector('#sidebar');
let projectsList = getProjects('projectsList', [], Project('My first project'));

function renderTodosList(projectIndex) {
    const todosList = document.querySelector('#todos-list');
    const project = projectsList[projectIndex];
    todosList.innerHTML = ''; // Clear the list

    project.todos.forEach((todo, index) => {
        renderToDo(todosList, todo.title, todo.description, todo.dueDate, todo.priority, index, todo.status);
    });
}

function handleSidebarClick(click) {
    if (click.hasAttribute('data-index')) {
        const index = click.dataset.index;
        renderMain(content, projectsList[index].name, index);
        renderTodosList(index);
    } else if (click.id === 'new-project') {
        disableButtons(document.querySelectorAll('button'));
        showProjectForm(content, 'Add');

        const form = document.querySelector('form');
        form.onsubmit = (submission) => {
            submission.preventDefault();
            removeForm(content, form);

            const newProject = Project(form.elements.namedItem('project-title').value);
            projectsList.push(newProject);

            renderSidebar(newProject.name, projectsList.indexOf(newProject));
            renderMain(content, newProject.name, projectsList.indexOf(newProject));

            saveProjects('projectsList', projectsList);
            enableButtons(document.querySelectorAll('button'));
        };

        document.querySelector('#cancel-project').onclick = () => {
            removeForm(content, form);
            enableButtons(document.querySelectorAll('button'));
        }
    }
}

function handleContentClick(button) {
    const projectIndex = document.querySelector('#project-full').getAttribute('data-index');

    if (button.id === 'new-todo') {
        disableButtons(document.querySelectorAll('button'));
        showToDoForm(content, 'Add');

        const form = document.querySelector('form');
        form.onsubmit = (submission) => {
            submission.preventDefault();
            removeForm(content, form);

            const newToDo = toDo(
                form.elements.namedItem('todo-title').value,
                form.elements.namedItem('description').value,
                form.elements.namedItem('date').value,
                form.elements.namedItem('priority').value
            );

            projectsList[projectIndex].todos.push(newToDo);
            renderToDo(document.querySelector('#todos-list'), newToDo.title, newToDo.description, newToDo.dueDate, newToDo.priority, projectsList[projectIndex].todos.length - 1, newToDo.status);

            saveProjects('projectsList', projectsList);
            enableButtons(document.querySelectorAll('button'));
        };

        document.querySelector('#cancel-todo').onclick = () => {
            removeForm(content, form);
            enableButtons(document.querySelectorAll('button'));
        }
    } else if (button.classList.contains('expand-todo')) {
        expandToDo(document.querySelector(`[data-index="${button.getAttribute('data-index')}"]`));
    } else if (button.classList.contains('edit-todo')) {
        const todoIndex = button.getAttribute('data-index');
        const buttons = document.querySelectorAll('button');
        disableButtons(buttons);

        showToDoForm(
            content,
            'Edit',
            projectsList[projectIndex].todos[todoIndex].title,
            projectsList[projectIndex].todos[todoIndex].description,
            projectsList[projectIndex].todos[todoIndex].dueDate,
            projectsList[projectIndex].todos[todoIndex].priority
        );

        const form = document.querySelector('form');
        form.onsubmit = (submission) => {
            submission.preventDefault();
            removeForm(content, form);

            const todo = projectsList[projectIndex].todos[todoIndex];
            todo.title = form.elements.namedItem('todo-title').value;
            todo.description = form.elements.namedItem('description').value;
            todo.dueDate = form.elements.namedItem('date').value;
            todo.priority = form.elements.namedItem('priority').value;

            editToDo(
                document.querySelector(`[data-index="${button.getAttribute('data-index')}"]`),
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority
            );

            saveProjects('projectsList', projectsList);
            enableButtons(buttons);
        };

        document.querySelector('#cancel-todo').onclick = () => {
            removeForm(content, form);
            enableButtons(buttons);
        }
    } else if (button.classList.contains('check-todo')) {
        const todoIndex = button.getAttribute('data-index');
        const todo = projectsList[projectIndex].todos[todoIndex];
        todo.status = toggleStatus(todo.status);
        toggleTodoStatusClass(document.querySelector(`[data-index="${button.getAttribute('data-index')}"]`));

        saveProjects('projectsList', projectsList);
    } else if (button.classList.contains('delete-todo')) {
        const todoIndex = button.getAttribute('data-index');
        deleteToDo(projectsList[projectIndex].todos, todoIndex);
        renderTodosList(projectIndex);
        saveProjects('projectsList', projectsList);
    } else if (button.id === 'edit-project') {
        disableButtons(document.querySelectorAll('button'));
        showProjectForm(content, 'Edit', projectsList[projectIndex].name);

        const form = document.querySelector('form');
        form.onsubmit = (submission) => {
            submission.preventDefault();
            removeForm(content, form);
            projectsList[projectIndex].name = form.elements.namedItem('project-title').value;

            updateProjectName(document.querySelector(`[data-index="${projectIndex}"]`), projectsList[projectIndex].name);
            updateProjectName(document.querySelector('#project-top-row h2'), projectsList[projectIndex].name);

            saveProjects('projectsList', projectsList);
            enableButtons(document.querySelectorAll('button'));
        };

        document.querySelector('#cancel-project').onclick = () => {
            removeForm(content, form);
            enableButtons(document.querySelectorAll('button'));
        }
    } else if (button.id === 'delete-project') {
        const projectIndex = document.querySelector('#project-full').dataset.index;
        deleteProject(projectsList, projectIndex);
        renderSidebarList();
        if (projectsList.length > 0) {
            renderMain(content, projectsList[0].name, 0);
            renderTodosList(0);
        } else {
            content.removeChild(document.querySelector('#project-full'));
        }
        saveProjects('projectsList', projectsList);
    }
}

function renderSidebarList() {
    sidebar.innerHTML = '';
    projectsList.forEach((project, index) => {
        renderSidebar(project.name, index);
    });
}

sidebar.onclick = (e) => {
    handleSidebarClick(e.target);
};

content.onclick = (e) => {
    handleContentClick(e.target);
};

// Initial rendering
renderSidebarList();
if (projectsList.length > 0) {
    renderMain(content, projectsList[0].name, 0);
    renderTodosList(0);
}
