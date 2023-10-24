const createProject = (name) => {
    const todos = [];

    return { name, todos };
}

const deleteTodo = (todosArray, removedTodoIndex) => {
    todosArray.splice(removedTodoIndex, 1);
}

const deleteProject = (projectsList, deletedProjectIndex) => {
    projectsList.splice(deletedProjectIndex, 1);
}

export { createProject, deleteTodo, deleteProject };