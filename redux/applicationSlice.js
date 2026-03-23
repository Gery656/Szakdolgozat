import { createSlice } from "@reduxjs/toolkit";

export const apiURL = "/api"

const initialState = {
    number: 0,
    token:null,
    user:null,

};

const ApplicationSlice = createSlice({
    name: "szakdolgozat",
    initialState,
    reducers: {
        setNumber: (state, { payload }) => {
            state.number = payload
        },
        inc: (state) => {
            state.number = state.number+1
        },
        dec: (state) => {
            state.number = state.number-1
        },
        setToken:(state,{payload})=>{
            state.token=payload
        },
        setUser:(state,{payload})=>{
            state.user=payload
        },
    }
});

export const {setNumber,inc,dec,setToken, setUser} = ApplicationSlice.actions;

export default ApplicationSlice;

//selectors for useSelector()
export const getNumber = (state) => state.number;
export const getToken = (state) => state.token;
export const getUser = (state) => state.user;

