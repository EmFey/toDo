const createTodo = (title, description, dueDate, priority) => {
    const status = false;

    const toggleStatus = () => {
        return !status;
    }

    return { title, description, dueDate, priority, status, toggleStatus };
}

export { createTodo };