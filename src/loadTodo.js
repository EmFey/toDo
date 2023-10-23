import { format } from 'date-fns';

const createFormElement = (tagName, attributes = {}) => {
    const element = document.createElement(tagName);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
};

const createPriorityRadio = (id, name, value, existingPriority) => {
    const input = createFormElement('input', {
        id,
        name,
        type: 'radio',
        value,
    });

    if (value === existingPriority) {
        input.setAttribute('checked', '');
    }

    return input;
};

const showToDoForm = (content, action, existingTitle, existingDescription, existingDueDate, existingPriority) => {
    const newForm = createFormElement('form', { id: 'todo-form' });

    const toDoTitle = createFormElement('h3');
    toDoTitle.textContent = `${action} Task`;
    newForm.appendChild(toDoTitle);

    const inputs = [
        { label: 'Task title', name: 'todo-title', type: 'text', placeholder: 'Task Title', required: '', value: existingTitle },
        { label: 'Task Description', name: 'description', type: 'text', placeholder: 'Task Description', value: existingDescription },
        { label: 'Due Date', name: 'date', type: 'date', required: '', value: existingDueDate },
    ];

    inputs.forEach((inputInfo) => {
        const label = createFormElement('label', { for: inputInfo.name });
        label.textContent = inputInfo.label;
        newForm.appendChild(label);

        const input = createFormElement('input', {
            name: inputInfo.name,
            type: inputInfo.type,
            placeholder: inputInfo.placeholder,
            required: inputInfo.required,
            value: inputInfo.value,
        });
        newForm.appendChild(input);
    });

    const priorityWrapper = createFormElement('div', { id: 'priority-question-wrapper' });
    const priorities = ['Low priority', 'Medium priority', 'High priority'];

    priorities.forEach((priority) => {
        const id = `${priority.toLowerCase().replace(' ', '-')}-priority`;
        const input = createPriorityRadio(id, 'priority', priority, existingPriority);
        const label = createFormElement('label', { for: id });
        label.textContent = priority;

        priorityWrapper.appendChild(input);
        priorityWrapper.appendChild(label);
    });

    newForm.appendChild(priorityWrapper);

    const submit = createFormElement('button', { type: 'submit', id: 'submit-todo' });
    submit.textContent = `${action} Todo`;
    newForm.appendChild(submit);

    const cancel = createFormElement('button', { type: 'button', id: 'cancel-todo' });
    cancel.textContent = 'Cancel';
    newForm.appendChild(cancel);

    content.appendChild(newForm);
};

const createTodoButton = (className, title, datasetIndex) => {
    const button = createFormElement('button', { class: className, 'data-index': datasetIndex, title });
    button.textContent = title;
    return button;
};

const renderToDo = (toDosDOM, title, description, dueDate, priority, todoIndex, status) => {
    const priorities = {
        'Low priority': 'low-priority',
        'Medium priority': 'medium-priority',
        'High priority': 'high-priority',
    };

    const todoDOM = createFormElement('section', { class: 'todo', 'data-index': todoIndex });

    if (priorities[priority]) {
        todoDOM.classList.add(priorities[priority]);
    }

    if (status) {
        todoDOM.classList.add('todo-completed');
    }

    const todoTopRow = createFormElement('div', { class: 'todo-top-row' });
    const todoNameAndDate = createFormElement('div', { class: 'todo-name-and-date' });

    const titleDOM = createFormElement('h3', { class: 'todo-title' });
    titleDOM.textContent = title;
    todoNameAndDate.appendChild(titleDOM);

    const dueDateDOM = createFormElement('p', { class: 'todo-due-date' });
    dueDateDOM.textContent = format(new Date(dueDate), 'MM/dd/yyyy');
    todoNameAndDate.appendChild(dueDateDOM);

    todoTopRow.appendChild(todoNameAndDate);

    const todoButtons = createFormElement('div', { class: 'todo-buttons' });

    const buttonInfo = [
        ['expand-todo', 'Expand task', '+'],
        ['edit-todo edit-button', 'Edit task', 'Edit'],
        ['check-todo', 'Change task status', 'Complete?'],
        ['delete-todo delete-button', 'Delete task', 'X'],
    ];

    buttonInfo.forEach((info) => {
        const button = createTodoButton(info[0], info[2], todoIndex);
        button.title = info[1];
        todoButtons.appendChild(button);
    });

    todoTopRow.appendChild(todoButtons);
    todoDOM.appendChild(todoTopRow);

    const todoDetails = createFormElement('div', { class: 'todo-details todo-details-hidden' });

    const descriptionDOM = createFormElement('p', { class: 'todo-description' });
    descriptionDOM.textContent = description;
    todoDetails.appendChild(descriptionDOM);

    const priorityDOM = createFormElement('p', { class: 'todo-priority' });
    priorityDOM.textContent = priority;
    todoDetails.appendChild(priorityDOM);

    todoDOM.appendChild(todoDetails);

    toDosDOM.appendChild(todoDOM);
};

const toggleTodoStatusClass = (todoDOM) => {
    todoDOM.classList.toggle('todo-completed');
};

export { showToDoForm, renderToDo, toggleTodoStatusClass };