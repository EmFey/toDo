/**
 * Check if local storage is available.
 * This function is adapted from the MDN Web Docs.
 */
function isLocalStorageAvailable() {
    try {
      const storage = window.localStorage;
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Save an item in local storage if available.
   * @param {string} key - The name of the storage item.
   * @param {any} value - The value to save.
   */
  function saveToLocalStorage(key, value) {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Get an item from local storage if available, or use a default value.
   * @param {string} key - The name of the storage item.
   * @param {any} defaultValue - The default value if the item is not found.
   * @returns {any} - The retrieved item or the default value.
   */
  function getFromLocalStorage(key, defaultValue) {
    if (isLocalStorageAvailable()) {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        try {
          return JSON.parse(storedItem);
        } catch (error) {
          console.error('Error parsing stored item:', error);
        }
      }
    }
    return defaultValue;
  }

export { saveToLocalStorage, getFromLocalStorage };