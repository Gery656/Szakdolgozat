import { configureStore } from "@reduxjs/toolkit";
import ApplicationSlice from "./applicationSlice";

export const store = configureStore({
    reducer: ApplicationSlice.reducer
});