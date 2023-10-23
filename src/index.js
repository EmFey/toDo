// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const tab1 = document.getElementById('tab1');
    const tab2 = document.getElementById('tab2');
    const addProjectButton = document.getElementById('add-project');
    const content = document.getElementById('content');
    const addTodoButton = document.getElementById('add-todo');

    // Function to populate content section when a tab is clicked
    function populateContent(tabName) {
        content.innerHTML = `<h2>${tabName} Content</h2>`;
    }

    // Event listeners for tab buttons
    tab1.addEventListener('click', () => {
        populateContent('Tab 1');
    });

    tab2.addEventListener('click', () => {
        populateContent('Tab 2');
    });

    // Event listener for adding a project
    addProjectButton.addEventListener('click', () => {
        const projectName = prompt('Enter project name:');
        if (projectName) {
            // Handle adding a new project here
        }
    });

    // Event listener for adding a todo
    addTodoButton.addEventListener('click', () => {
        const todoName = prompt('Enter todo name:');
        if (todoName) {
            // Handle adding a new todo here
        }
    });

    // Initial content population
    populateContent('Tab 1');
});