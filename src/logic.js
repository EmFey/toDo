class Project {
    constructor(name) {
      this.name = name;
      this.todos = [];
    }

    addTodo(todo) {
      this.todos.push(todo);
    }

    deleteTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    }
  }

  function deleteProject(projectsList, project) {
    const index = projectsList.indexOf(project);
    if (index !== -1) {
      projectsList.splice(index, 1);
    }
  }

export { Project, deleteProject };