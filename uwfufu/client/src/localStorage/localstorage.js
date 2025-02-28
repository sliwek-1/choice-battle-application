function savePersistedData(data) {
    try {
        const saveData = localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
        console.log(error)
        throw error;
    }
}

function loadPersistedData() {
    try {
        const persistedData = localStorage.getItem('user');
        if(persistedData === null) {
            return undefined;
        }
        return JSON.parse(persistedData)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function clearPersistedData() {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {savePersistedData, loadPersistedData, clearPersistedData}