import ItemModel from "./loadTodo";
import ProjectModel from "./loadProject";

class Projects {
    constructor() {
        this.loadProjects();
    }

    loadProjects() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
    }

    saveProjects() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }

    createProject(title) {
        const newProject = new ProjectModel(title);
        this.projects.push(newProject);
        this.saveProjects();
    }

    removeProject(projId) {
        this.projects = this.projects.filter(proj => proj.id !== projId);
        this.saveProjects();
    }

    addItem(title, dueDate, description, priority, completionStatus, projId) {
        const newItem = new ItemModel(title, dueDate, description, priority, completionStatus);
        const project = this.projects.find(p => p.id === projId);
        project.todos.push(newItem);
        this.saveProjects();
    }

    editItem(title, dueDate, description, priority, completionStatus, projId, itemId) {
        const project = this.projects.find(p => p.id === projId);
        const item = project.todos.find(i => i.id === itemId);

        Object.assign(item, { title, dueDate, description, priority, completionStatus });
        this.saveProjects();
    }

    removeItem(projId, itemId) {
        const project = this.projects.find(p => p.id === projId);
        project.todos = project.todos.filter(todo => todo.id !== itemId);
        this.saveProjects();
    }
}

export default Projects;