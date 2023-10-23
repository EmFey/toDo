const renderPage = (() => {
    const content = document.querySelector('#content')

    const sidebar = document.createElement('section')
    sidebar.id = 'sidebar'

    const sidebarTopWrapper = document.createElement('div')
    sidebarTopWrapper.id = 'sidebar-top-wrapper'

    const sidebarTitle = document.createElement('h2')
    sidebarTitle.innerHTML = 'Projects'
    sidebarTopWrapper.appendChild(sidebarTitle)

    const newProject = document.createElement('button')
    newProject.innerHTML = 'New Project'
    newProject.id = 'new-project'
    sidebarTopWrapper.appendChild(newProject)

    const sidebarListOfProjects = document.createElement('section')
    sidebarListOfProjects.id = 'projects-list'

    sidebar.appendChild(sidebarTopWrapper)
    sidebar.appendChild(sidebarListOfProjects)
    content.appendChild(sidebar)
})()

const renderSidebar = (projectName, index) => {
    const sidebarListOfProjects = document.querySelector('#projects-list')

    const projectSide = document.createElement('button')
    projectSide.dataset.index = index
    projectSide.classList.add('project-sidebar')
    projectSide.innerHTML = projectName

    sidebarListOfProjects.appendChild(projectSide)
}

const renderMain = (content, projectTitle, index) => {

    if (document.querySelector('#project-full')) {
        content.removeChild(document.querySelector('#project-full'))
    }

    const projectMainDOM = document.createElement('section')
    projectMainDOM.id = 'project-full'
    projectMainDOM.dataset.index = index

    const projectTopRow = document.createElement('div')
    projectTopRow.id = 'project-top-row'

    const projectTitleDOM = document.createElement('h2')
    projectTitleDOM.innerHTML = projectTitle
    projectTopRow.appendChild(projectTitleDOM)

    const projectButtonWrapper = document.createElement('div')
    projectButtonWrapper.id = 'project-buttons'

    const newToDo = document.createElement('button')
    newToDo.innerHTML = 'New Task'
    newToDo.id = 'new-todo'
    newToDo.setAttribute('title', 'New task')
    projectButtonWrapper.appendChild(newToDo)

    const editProjectButton = document.createElement('button')
    editProjectButton.id = 'edit-project'
    editProjectButton.classList.add('edit-button')
    editProjectButton.setAttribute('title', 'Edit Project')
    editProjectButton.innerHTML = 'Edit Project'
    projectButtonWrapper.appendChild(editProjectButton)

    const deleteProjectButton = document.createElement('button')
    deleteProjectButton.id = 'delete-project'
    deleteProjectButton.classList.add('delete-button')
    deleteProjectButton.setAttribute('title', 'Delete Project')
    deleteProjectButton.innerHTML = 'X'
    projectButtonWrapper.appendChild(deleteProjectButton)

    projectTopRow.appendChild(projectButtonWrapper)

    projectMainDOM.appendChild(projectTopRow)

    const toDosDOM = document.createElement('section')
    toDosDOM.id = 'todos-list'
    projectMainDOM.appendChild(toDosDOM)

    content.appendChild(projectMainDOM)
}

const removeForm = (content, form) => {
    content.removeChild(form)
}

const disableButtons = (buttons) => {
    buttons.forEach((button) => {
        button.setAttribute('disabled', '')
    })
}

const enableButtons = (buttons) => {
    buttons.forEach((button) => {
        button.removeAttribute('disabled')
    })
}

export {
    renderPage,
    renderSidebar,
    renderMain,
    removeForm,
    disableButtons,
    enableButtons,
}