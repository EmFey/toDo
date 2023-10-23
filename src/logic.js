const createProject = (name) => {
    const todos = [];

    const deleteTodo = (removedTodoIndex) => {
        todos.splice(removedTodoIndex, 1);
    };

    return {
        name,
        todos,
        deleteTodo,
    };
};

const deleteProject = (projectsList, deletedProjectIndex) => {
    projectsList.splice(deletedProjectIndex, 1);
};

export { createProject as Project, deleteProject };
