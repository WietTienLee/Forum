import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        msg: "",
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false
            state.users.allUsers = action.payload
            state.users.error = false
        },
        getUserFailed: (state) => {
            state.users.isFetching = false
            state.users.error = true
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false
            state.users.error = false
            state.msg = action.payload
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false
            state.users.error = true
            state.msg = action.payload
        },

    }
})

export const { getUserStart, getUserSuccess, getUserFailed, deleteUserFailed, deleteUserStart, deleteUserSuccess } = userSlice.actions
export default userSlice.reducer