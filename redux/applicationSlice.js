import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

export const apiURL = process.env.EXPO_PUBLIC_API_URL
export const storageURL = process.env.EXPO_PUBLIC_STORAGE_URL

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
    selectedEvent:null,
    selectedCatalog:null,
    selectedBluetoothDevice:null,
    sharedCatalog:null,
    addMandatoryUserMethod : "email"

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
        setSelectedEvent:(state,{payload})=>{
            state.selectedEvent=payload
        },
        setSelectedCatalog:(state,{payload})=>{
            state.selectedCatalog=payload
        },
        setSelectedBluetoothDevice:(state,{payload})=>{
            state.selectedBluetoothDevice=payload
        },
        setSharedCatalog:(state,{payload})=>{
            state.sharedCatalog=payload
        },
        reset:(state)=>{
            state.events = null
            state.token = null
            state.user = null
            state.selectedEvent = null
            state.selectedCatalog = null
            state.sharedCatalog=null
        },
        setAddMandatoryUserMethod:(state,{payload})=>{
            if (payload==="email" || payload==="identifier") {
                state.addMandatoryUserMethod = payload
            }
            else{
                state.addMandatoryUserMethod = "email"
            }
        }
    }
});

export const {setNumber,inc,dec,setToken, setUser,setEvents,setSelectedEvent,setSelectedCatalog,setSelectedBluetoothDevice,setSharedCatalog,reset,setAddMandatoryUserMethod} = ApplicationSlice.actions;

export default ApplicationSlice;

//selectors for useSelector()
export const getNumber = (state) => state.number;
export const getToken = (state) => state.token;
export const getUser = (state) => state.user;
export const getEvents = (state) => state.events;
export const getSelectedEvent = (state) => state.selectedEvent;
export const getSelectedCatalog = (state) => state.selectedCatalog;
export const getSelectedBluetoothDevice = (state) => state.selectedBluetoothDevice;
export const getSharedCatalog = (state) => state.sharedCatalog;
export const getAddMandatoryUserMethod = (state) => state.addMandatoryUserMethod;

