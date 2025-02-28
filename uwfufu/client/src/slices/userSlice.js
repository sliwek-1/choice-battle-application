import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: "",
    email: "",
    token: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.login = action.payload.login;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logoutUser: (state) => {
            state.login = "";
            state.email = "";
            state.token = "";
        }
    }
})

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;