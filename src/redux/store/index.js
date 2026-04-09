import { configureStore } from "@reduxjs/toolkit";
import geminiReducer from "../slices/gemini.slice";
import gbifReducer from "../slices/gbif.slice";


const store = configureStore({
    reducer:{
        gemini: geminiReducer,
        gbif: gbifReducer,
    }
});

export default store;