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
 * Save an item to local storage (if available).
 * @param {string} key - The key under which the item will be saved.
 * @param {any} value - The value to save in local storage.
 */
function saveToLocalStorage(key, value) {
    if (isStorageAvailable('localStorage')) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * Retrieve data from local storage or use a default value if storage is not available or empty.
 * @param {string} key - The key to retrieve data.
 * @param {any} defaultValue - The default value to use if storage is not available or empty.
 * @returns {any} - The retrieved or default value.
 */
function retrieveFromLocalStorage(key, defaultValue) {
    if (isStorageAvailable('localStorage')) {
        const storedData = JSON.parse(localStorage.getItem(key));
        if (storedData !== null) {
            return storedData;
        }
    }

    return defaultValue;
}

export { saveToLocalStorage as saveToLocalStorage, retrieveFromLocalStorage as retrieveFromLocalStorage };