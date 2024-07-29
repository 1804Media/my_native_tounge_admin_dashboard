export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = (key, data) => {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key, serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};