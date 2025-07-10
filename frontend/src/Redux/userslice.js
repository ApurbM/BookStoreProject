import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    CurrentUser: null,
    loading: false,
    errorInfo: null    
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.CurrentUser = action.payload;
            state.loading = false;
            state.errorInfo = null;
        },
        signInFailure: (state, action) => {
            state.errorInfo = action.payload;
            state.loading = false;
        },
        signOutStart:(state)=>{
            state.loading = true;
        },
        signOutSuccess:(state)=>{
            state.CurrentUser=null;
            state.loading=false;
            state.errorInfo=null;
        },
        signOutFailure:(state,action)=>{
            state.errorInfo=action.payload;
            state.loading=false;
        }
    }
});

export const
    {signInStart,
    signInSuccess,
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure} = userSlice.actions
export const userReducer = userSlice.reducer; 