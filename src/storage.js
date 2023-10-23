/**
 * Check if local storage is available in the current environment.
 * @param {string} type - The storage type to check (e.g., 'localStorage').
 * @returns {boolean} - True if storage is available, false otherwise.
 */
function isStorageAvailable(type) {
    try {
        const storage = window[type];
        const testKey = '__storage_test__';
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Save a project item to local storage (if available).
 * @param {string} itemName - The name of the item to save.
 * @param {any} itemValue - The value to save in local storage.
 */
function saveProject(itemName, itemValue) {
    if (isStorageAvailable('localStorage')) {
        localStorage.setItem(itemName, JSON.stringify(itemValue));
    }
}

/**
 * Retrieve projects from local storage, or use a default value if storage is not available or empty.
 * @param {string} itemName - The name of the item to retrieve.
 * @param {any} defaultValue - The default value to use if storage is not available or empty.
 * @returns {any} - The retrieved or default value.
 */
function getProjects(itemName, defaultValue) {
    if (isStorageAvailable('localStorage')) {
        const storedData = JSON.parse(localStorage.getItem(itemName));

        if (Array.isArray(storedData) && storedData.length > 0) {
            return storedData;
        }
    }

    return [defaultValue];
}

export { saveProject as saveProjects, getProjects };