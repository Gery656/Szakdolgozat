import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: 0,
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
    }
});

export const {setNumber,inc,dec} = ApplicationSlice.actions;

export default ApplicationSlice;

//selectors for useSelector()
export const getNumber = (state) => state.number;