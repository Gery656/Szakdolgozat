import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

export const apiURL = "http://192.168.168.206:8000/api"

export async function save(key, value) {
    return await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
    return await SecureStore.getItemAsync(key);
}

const initialState = {
    number: 0,
    token:null,
    user:null,
    events:null,

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
        setEvents:(state,{payload})=>{
            state.events=payload
        },
    }
});

export const {setNumber,inc,dec,setToken, setUser,setEvents} = ApplicationSlice.actions;

export default ApplicationSlice;

//selectors for useSelector()
export const getNumber = (state) => state.number;
export const getToken = (state) => state.token;
export const getUser = (state) => state.user;
export const getEvents = (state) => state.events;

