import {
    renderPage,
    renderSidebar,
    renderMain,
    removeForm,
    disableButtons,
    enableButtons,
} from './loadPage';
import { createProject, deleteToDo, deleteProject } from './logic';
import { createTodo } from './todo';
import { showProjectForm, updateProjectName } from './loadProject';
import {
    showToDoForm,
    renderToDo,
    expandToDo,
    editToDo,
    toggleTodoStatusClass,
} from './loadTodo';
import { saveProjects, getProjects } from './storage';

const PageController = (() => {
    const content = document.querySelector('#content');
    const sidebar = document.querySelector('#sidebar');
    let projectsList = [];

    const initializePage = () => {
        // Initialize the page with projects and todos
        projectsList = getProjects(
            'projectsList',
            projectsList,
            createProject('My first project')
        );
        renderInitialProjects();
    };

    const renderInitialProjects = () => {
        // Render the sidebar with all loaded projects
        projectsList.forEach((project, index) => {
            renderSidebar(project.name, index);
        });

        // Show the first project in the main view
        renderProjectAndTodos(0);
    };

    const renderProjectAndTodos = (projectIndex) => {
        // Render the selected project in the main view
        const project = projectsList[projectIndex];
        renderMain(content, project.name, projectIndex);

        // Render each of its todos
        project.todos.forEach((todo, index) => {
            renderToDo(
                document.querySelector('#todos-list'),
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority,
                index,
                todo.status
            );
        });
    };

    sidebar.onclick = function (e) {
        const click = e.target;
        if (click.hasAttribute('data-index')) {
            // Render the clicked project fully in the main view
            renderProjectAndTodos(click.dataset.index);
        } else if (click.id === 'new-project') {
            createNewProject();
        }
    };

    const createNewProject = () => {
        // Disable all buttons on the page before rendering the form
        const buttons = document.querySelectorAll('button');
        disableButtons(buttons);

        showProjectForm(content, 'Add');

        const form = document.querySelector('form');

        form.onsubmit = (submission) => {
            submission.preventDefault();

            // Create a new Project object
            const newProject = Project(form.elements.namedItem('project-title').value);
            projectsList.push(newProject);

            // Add the new project to the sidebar
            renderSidebar(newProject.name, projectsList.indexOf(newProject));

            // Render the project in full
            renderProjectAndTodos(projectsList.indexOf(newProject));

            // Save the project to localStorage
            saveProjects('projectsList', projectsList);

            // Re-enable buttons
            enableButtons(buttons);
        };

        document.querySelector('#cancel-project').onclick = () => {
            // Close the form modal if the user chooses the cancel button
            removeForm(form);
            enableButtons(buttons);
        };
    };

    // Handle other interactions similarly

    initializePage();
})();