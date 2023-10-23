// Import the Todo class if you haven't already
import { Todo } from './todo';

// An array to store your todos
const todos = [];

// Function to display todos in the content section
function displayTodos() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    if (todos.length === 0) {
        content.innerHTML = '<p>No todos to display.</p>';
        return;
    }

    todos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');
        todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Description: ${todo.description}</p>
            <p>Due Date: ${todo.dueDate}</p>
            <p>Priority: ${todo.priority}</p>
            <button class="delete-todo" data-index="${index}">Delete</button>
        `;

        content.appendChild(todoElement);
    });

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-todo');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            // Call a function to delete the todo at the specified index
            deleteTodo(index);
        });
    });
}

// Function to add a new todo
function addTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    todos.push(todo);
    displayTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        displayTodos();
    }
}

// Event listener for the "Add ToDo" button
const addTodoButton = document.getElementById('add-todo');
addTodoButton.addEventListener('click', () => {
    const title = prompt('Enter todo title:');
    const description = prompt('Enter todo description:');
    const dueDate = prompt('Enter due date:');
    const priority = prompt('Enter priority:');
    
    if (title && description && dueDate && priority) {
        addTodo(title, description, dueDate, priority);
    }
});

// Initial display of todos
displayTodos();

// Export functions or objects as needed for other parts of your application
export { addTodo, deleteTodo, displayTodos };