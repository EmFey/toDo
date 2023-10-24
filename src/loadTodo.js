import { format } from 'date-fns';

const createFormElement = (elementType, attributes = {}) => {
    const element = document.createElement(elementType);

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    return element;
};

const showToDoForm = (
    content,
    action,
    existingTitle,
    existingDescription,
    existingDueDate,
    existingPriority
) => {
    const newForm = createFormElement('form', { id: 'todo-form' });

    const toDoTitle = createFormElement('h3', {
        textContent: `${action} Task`,
    });
    newForm.appendChild(toDoTitle);

    const createInput = (name, type, placeholder, required, value) => {
        const input = createFormElement('input', {
            name,
            type,
            placeholder,
            required: required ? '' : undefined,
            value: value || '',
        });
        return input;
    };

    const titleLabel = createFormElement('label', {
        for: 'todo-title',
        textContent: 'Task Title',
    });
    const titleInput = createInput(
        'todo-title',
        'text',
        'Task Title',
        true,
        existingTitle
    );

    const descriptionLabel = createFormElement('label', {
        for: 'description',
        textContent: 'Task Description',
    });
    const descriptionInput = createInput(
        'description',
        'text',
        'Task Description',
        false,
        existingDescription
    );

    const dateLabel = createFormElement('label', {
        for: 'date',
        textContent: 'Due Date',
    });
    const dateInput = createInput(
        'date',
        'date',
        '',
        true,
        existingDueDate
    );

    const priorityWrapper = createFormElement('div', { id: 'priority-question-wrapper' });

    const createPriorityInput = (id, value, checked) => {
        const input = createFormElement('input', {
            id,
            name: 'priority',
            type: 'radio',
            value,
            checked: checked ? '' : undefined,
        });
        return input;
    };

    const createPriorityLabel = (forAttribute, textContent) => {
        return createFormElement('label', { for: forAttribute, textContent });
    };

    const priorityInputLow = createPriorityInput(
        'low-priority',
        'Low priority',
        existingPriority === 'Low priority'
    );
    const priorityLabelLow = createPriorityLabel('low-priority', 'Low priority');
    const priorityInputMedium = createPriorityInput(
        'medium-priority',
        'Medium priority',
        existingPriority === 'Medium priority'
    );
    const priorityLabelMedium = createPriorityLabel(
        'medium-priority',
        'Medium priority'
    );
    const priorityInputHigh = createPriorityInput(
        'high-priority',
        'High priority',
        existingPriority === 'High priority'
    );
    const priorityLabelHigh = createPriorityLabel('high-priority', 'High priority');

    const submit = createFormElement('button', {
        type: 'submit',
        id: 'submit-todo',
        textContent: `${action} Todo`,
    });
    const cancel = createFormElement('button', {
        type: 'button',
        id: 'cancel-todo',
        textContent: 'Cancel',
    });

    const appendElements = [
        titleLabel, titleInput, descriptionLabel, descriptionInput,
        dateLabel, dateInput, priorityWrapper,
        submit, cancel
    ];

    newForm.append(...appendElements);
    priorityWrapper.append(
        priorityInputLow, priorityLabelLow,
        priorityInputMedium, priorityLabelMedium,
        priorityInputHigh, priorityLabelHigh
    );

    content.appendChild(newForm);
};

const createTodoElement = (
    title,
    description,
    dueDate,
    priority,
    todoIndex,
    status
) => {
    const toDoDOM = document.createElement('section');
    toDoDOM.classList.add('todo');
    toDoDOM.dataset.index = todoIndex;
    toDoDOM.classList.add(priority.toLowerCase().replace(' ', '-') + '-priority');
    if (status) {
        toDoDOM.classList.add('todo-completed');
    }

    const createButton = (className, title, index) => {
        const button = createFormElement('button', {
            class: className,
            title,
            'data-index': index,
        });
        button.textContent = title;
        return button;
    };

    const expandButton = createButton('expand-todo', 'Expand task', todoIndex);
    const editButton = createButton('edit-todo edit-button', 'Edit task', todoIndex);
    const checkButton = createButton('check-todo', 'Change task status', todoIndex);
    const deleteButton = createButton('delete-todo delete-button', 'Delete task', todoIndex);

    const todoTopRow = document.createElement('div');
    todoTopRow.classList.add('todo-top-row');

    const todoNameAndDate = document.createElement('div');
    todoNameAndDate.classList.add('todo-name-and-date');

    const titleDOM = createFormElement('h3', {
        class: 'todo-title',
        textContent: title,
    });

    const dueDateDOM = createFormElement('p', {
        class: 'todo-due-date',
        textContent: format(
            Date.UTC(
                dueDate.slice(0, 4),
                dueDate.slice(5, 7) - 1,
                dueDate.slice(8, 10)
            ) + 86400000,
            'MM/dd/yyyy'
        ),
    });

    const todoButtons = document.createElement('div');
    todoButtons.classList.add('todo-buttons');

    const todoDetails = document.createElement('div');
    todoDetails.classList.add('todo-details', 'todo-details-hidden');

    const descriptionDOM = createFormElement('p', {
        class: 'todo-description',
        textContent: description,
    });

    const priorityDOM = createFormElement('p', {
        class: 'todo-priority',
        textContent: priority,
    });

    const appendElements = [
        titleDOM, dueDateDOM, expandButton, editButton, checkButton, deleteButton,
        descriptionDOM, priorityDOM,
    ];

    todoNameAndDate.append(...[titleDOM, dueDateDOM]);
    todoTopRow.append(todoNameAndDate, todoButtons);
    todoButtons.append(expandButton, editButton, checkButton, deleteButton);
    todoDetails.append(descriptionDOM, priorityDOM);

    toDoDOM.append(todoTopRow, todoDetails);
    toDoDOM.appendChild(toDoDOM);
};

const expandToDo = (todoDOM) => {
    const expandButton = todoDOM.querySelector('.expand-todo');
    expandButton.innerHTML = expandButton.innerHTML === '+' ? '-' : '+';
    const detailsDOM = todoDOM.querySelector('.todo-details');
    detailsDOM.classList.toggle('todo-details-hidden');
};

const editToDo = (todoDOM, title, description, dueDate, priority) => {
    todoDOM.querySelector('.todo-title').textContent = title;
    todoDOM.querySelector('.todo-description').textContent = description;

    const dueDateDOM = todoDOM.querySelector('.todo-due-date');
    dueDateDOM.textContent = format(
        Date.UTC(
            dueDate.slice(0, 4),
            dueDate.slice(5, 7) - 1,
            dueDate.slice(8, 10)
        ) + 86400000,
        'MM/dd/yyyy'
    );

    const priorityDOM = todoDOM.querySelector('.todo-priority');
    priorityDOM.textContent = priority;

    const priorityClasses = ['low-priority', 'medium-priority', 'high-priority'];
    priorityClasses.forEach((cls) => {
        if (cls === priority.toLowerCase().replace(' ', '-')) {
            todoDOM.classList.add(cls);
        } else {
            todoDOM.classList.remove(cls);
        }
    });
};

const toggleTodoStatusClass = (todoDOM) => {
    todoDOM.classList.toggle('todo-completed');
};

export {
    showToDoForm,
    createTodoElement as renderToDo,
    expandToDo,
    editToDo,
    toggleTodoStatusClass,
};