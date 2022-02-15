import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            newUser: null,
            isFetching: false,
            error: false
        },
        logout: {
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        loginGGStart: (state) => {
            state.login.isFetching = true;
        },
        loginGGSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginGGFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.newUser = action.payload
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null//DELETE USER LOGIN
            state.login.error = false
        },
        logoutFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },

    }
})
export const { loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    loginGGStart, loginGGSuccess, loginGGFailed
} = authSlice.actions
export default authSlice.reducer