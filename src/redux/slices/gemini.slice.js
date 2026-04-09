import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDLE, SUCCEEDED, FAILED, LOADING } from "./status";

const API_KEY = process.env.REACT_APP_GEMINI_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${API_KEY}`;
const url2 = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

export const getScienfiticName = createAsyncThunk('gemini/fetchScientificName', async(commonName)=>{
    const payload = {
    contents: [
      {
        parts: [{ text:  `Sin nada extra, dime la especie taxonómica y género del: ${commonName}`}],
      },
    ],
  };

  try {
    const response = await axios.post(url2, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('AAAAAAAAAAAAAAAAAAAAAAA')
    console.log('CONTENIDO DEL MOCK EN EL TEST:', response.data);
    const content = response.data.candidates[0].content.parts[0].text;
    const regex = /\*([^*]*)\*/g;
    const rawSpecies = content.match(regex);
    const cleanSpecies = rawSpecies.map(term =>term.replace(/\*/g, ""));

    const data = {
      'genus' : cleanSpecies[0],
      'species': cleanSpecies[1],
    }
    return data;

  } catch (error) {
    console.error('Error llamando a Gemini:', error.response ? error.response.data : error.message);
  }
    });

const geminiSilce = createSlice({
    name: 'gemini',
    initialState: {
        apiSearchStatus : IDLE,
        scientificName: {}
    },
    reducers: {

    },
    extraReducers: builder =>{
        builder
        .addCase(getScienfiticName.pending, (state, action)=>{
            state.apiSearchStatus = LOADING;
        })
        .addCase(getScienfiticName.fulfilled, (state, action) =>{
            state.scientificName = action.payload;
            state.apiSearchStatus = SUCCEEDED;
        })
        .addCase(getScienfiticName.rejected, (state, action)=>{
            state.apiSearchStatus = FAILED;
        })
    }
})

const {reducer: geminiReducer} = geminiSilce
export default geminiReducer;