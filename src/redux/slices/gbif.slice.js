import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "./status";
const axios = require('axios/dist/node/axios.cjs');


const descriptionUrl = 'https://api.gbif.org/v1/species/search?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&rank=SPECIES&q='

export const getDescriptions = createAsyncThunk('gbif/getDescription', async(animalSpecies)=>{
    try{
        const response = await axios.get(descriptionUrl+animalSpecies);
        const descriptions = response.data.results[0].descriptions;
        const taxonId = response.data.results[0].key;
        const speciesThreatStatus = response.data.results[0].threatStatuses[0];
        return {
            description: descriptions,
            taxonID: taxonId,
            threatStatus: speciesThreatStatus
        }
    }catch(error){
        console.log(error.response ? error.response.data : error.message);
    };
});

const gbifSilce = createSlice({
    name: 'gbif',
    initialState: {
        statusDescriptions : IDLE,
        statusMap: IDLE,
        animalInfo :{
            description : '',
            taxonID : '',
            threatStatus: ''
        },
        specieUpdated: null,
        mapInfo: ''
    },
    reducers: {
        updatedStatusSpecie: (state, action)=>{
            state.specieUpdated = action.payload;
        },
        resetStatus: (state, action)=>{
            state.statusDescriptions = IDLE;
            state.statusMap = IDLE;
            state.animalInfo = {
            description : '',
            taxonID : '',
            threatStatus: ''
            };
            state.specieUpdated = null;
            state.mapInfo = '';
        }
     },
    extraReducers: builder =>  {
        builder
        .addCase(getDescriptions.pending, (state,action)=>{
            state.statusDescriptions = LOADING;
        })
        .addCase(getDescriptions.fulfilled, (state,action) =>{
            state.animalInfo = action.payload;
            state.statusDescriptions = SUCCEEDED;
        })
        .addCase(getDescriptions.rejected, (state, action)=>{
            state.statusDescriptions = FAILED;
        })
    }

})

export const {updatedStatusSpecie, resetStatus} = gbifSilce.actions;

const {reducer: gbifReducer} = gbifSilce;
export default gbifReducer;