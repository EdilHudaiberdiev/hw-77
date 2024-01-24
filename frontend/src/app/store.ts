import {configureStore} from "@reduxjs/toolkit";
import {MessagesReducer} from "../store/MessagesSlice";


export const store = configureStore({
    reducer: {
        messages: MessagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;