const { v4: uuidv4 } = require('uuid');

class ItemModel {
    constructor(title, dueDate, description, priority, completionStatus = false) {
        this.id = uuidv4();
        Object.assign(this, { title, dueDate, description, priority, completionStatus });
    }
}

export default ItemModel;