const createProjectForm = (content, action, existingValue) => {
    const projectForm = document.createElement('form');
    projectForm.id = 'project-form';
  
    const formTitle = document.createElement('h3');
    formTitle.innerHTML = `${action} Project`;
    projectForm.appendChild(formTitle);
  
    const projectTitleLabel = createFormLabel('Project Title', 'project-title');
    projectForm.appendChild(projectTitleLabel);
  
    const projectTitleInput = createFormInput(
      'project-title',
      'text',
      'Project Title',
      'required',
      existingValue
    );
    projectForm.appendChild(projectTitleInput);
  
    const submit = createFormButton(`${action} Project`, 'submit-project');
    const cancel = createFormButton('Cancel', 'cancel-project', 'button');
  
    projectForm.appendChild(submit);
    projectForm.appendChild(cancel);
  
    content.appendChild(projectForm);
  };
  
  const createFormLabel = (text, htmlFor) => {
    const label = document.createElement('label');
    label.setAttribute('for', htmlFor);
    label.innerHTML = text;
    return label;
  };
  
  const createFormInput = (name, type, placeholder, required, value) => {
    const input = document.createElement('input');
    input.setAttribute('name', name);
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    if (required) {
      input.setAttribute('required', '');
    }
    if (value) {
      input.setAttribute('value', value);
    }
    return input;
  };
  
  const createFormButton = (text, id, type = 'submit') => {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.id = id;
    button.innerHTML = text;
    return button;
  };
  
  const updateProjectName = (projectNameDOM, projectName) => {
    projectNameDOM.innerHTML = projectName;
  };

export { createProjectForm, updateProjectName };