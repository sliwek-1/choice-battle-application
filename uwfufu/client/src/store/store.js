import { configureStore, prepareAutoBatched } from "@reduxjs/toolkit";
import userSlice from './../slices/userSlice';
import { loadPersistedData, savePersistedData } from "../localStorage/localstorage.js";
import { loadQuizData, saveQuizData } from "../localStorage/quizStorage.js";
import quizSlice from "./../slices/quizSlice.js";

const persistedData = loadPersistedData();
const quizPersistedData = loadQuizData();

const data = {
    user: persistedData || {},
    quiz: quizPersistedData || {}
}

const store = configureStore({
    reducer: {
        user: userSlice,
        quiz: quizSlice,
    },
    preloadedState: data
})

store.subscribe(() => {
    const state = store.getState();
    savePersistedData(state.user)
    saveQuizData(state.quiz)
})

export default store;