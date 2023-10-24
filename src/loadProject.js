const createFormElement = (elementType, attributes = {}) => {
    const element = document.createElement(elementType);

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    return element;
};

const showProjectForm = (content, action, existingValue) => {
    const projectForm = createFormElement('form', { id: 'project-form' });

    const formTitle = createFormElement('h3');
    formTitle.textContent = `${action} Project`;
    projectForm.appendChild(formTitle);

    const projectTitleLabel = createFormElement('label', {
        for: 'project-title',
        textContent: 'Project Title',
    });
    projectForm.appendChild(projectTitleLabel);

    const projectTitleInput = createFormElement('input', {
        name: 'project-title',
        type: 'text',
        placeholder: 'Project Title',
        required: '',
        value: existingValue || '',
    });
    projectForm.appendChild(projectTitleInput);

    const submit = createFormElement('button', {
        type: 'submit',
        id: 'submit-project',
        textContent: `${action} Project`,
    });
    projectForm.appendChild(submit);

    const cancel = createFormElement('button', {
        type: 'button',
        id: 'cancel-project',
        textContent: 'Cancel',
    });
    projectForm.appendChild(cancel);

    content.appendChild(projectForm);
};

const updateProjectName = (projectNameDOM, projectName) => {
    projectNameDOM.textContent = projectName;
};

export { showProjectForm, updateProjectName };