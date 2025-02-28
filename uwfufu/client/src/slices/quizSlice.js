import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    filepath: "",
    category: "",
    status: "",
    quiz_id: ""
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.title = action.payload.title;
            state.filepath = action.payload.filepath;
            state.category = action.payload.category;
            state.status = action.payload.status;
            state.quiz_id = action.payload.quiz_id
        },
        deleteQuiz: (state) => {
            state.title = "";
            state.filepath = "";
            state.category = "";
            state.status = "";
            state.quiz_id = ""
        }
    }
})


export const {setQuiz, deleteQuiz} = quizSlice.actions;
export default quizSlice.reducer;