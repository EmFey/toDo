class ToDo {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.status = false;
    }

    toggleStatus() {
      this.status = !this.status;
    }
  }

export default ToDo;