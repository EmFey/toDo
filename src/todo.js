const createTodo = (title, description, dueDate, priority) => {
    let completed = false;

    const toggleStatus = () => {
        completed = !completed;
    };

    return {
        title,
        description,
        dueDate,
        priority,
        get completed() {
            return completed;
        },
        toggleStatus,
    };
};

export { createTodo as toDo };