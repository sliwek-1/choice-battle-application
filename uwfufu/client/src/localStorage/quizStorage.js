function saveQuizData(data) {
    try {
        const saveData = localStorage.setItem('quiz', JSON.stringify(data));
    } catch (error) {
        console.log(error)
        throw error;
    }
}

function loadQuizData() {
    try {
        const persistedData = localStorage.getItem('quiz');
        if(persistedData === null) {
            return undefined;
        }
        return JSON.parse(persistedData)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function clearQuizData() {
    try {
        localStorage.removeItem('quiz');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {saveQuizData, loadQuizData, clearQuizData}