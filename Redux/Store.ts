import { configureStore } from "@reduxjs/toolkit";
import { rickyReducer } from "./Slices/RickyAndMortySlice";

export const Store = configureStore({
    reducer: {
        ricky: rickyReducer
    }
});

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch;