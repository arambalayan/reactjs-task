import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: false,
    data: [],
    info: {},
    species: [],
    error: ''
}

export const pokemonAsync = createAsyncThunk(
    'pokemon/fetchPokemon',
    async (offset, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=16&name='ivysaur'`);
            return response.data.results;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const infoAsync = createAsyncThunk(
    'pokemon/fetchInfo',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const speciesAsync = createAsyncThunk(
    'pokemon/fetchSpecies',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)


export const pokemonSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pokemonAsync.pending, (state) => {
                state.status = false
            })
            .addCase(pokemonAsync.fulfilled, (state, action) => {
                state.status = true
                state.data = action.payload
            })
            .addCase(pokemonAsync.rejected, (state, action) => {
                state.status = false
                state.error = action.payload
            })
            .addCase(infoAsync.pending, (state) => {
                state.status = false
            })
            .addCase(infoAsync.fulfilled, (state, action) => {
                state.status = true
                state.info = action.payload
            })
            .addCase(infoAsync.rejected, (state, action) => {
                state.status = false
                state.error = action.payload
            })
            .addCase(speciesAsync.pending, (state) => {
                state.status = false
            })
            .addCase(speciesAsync.fulfilled, (state, action) => {
                state.status = true
                state.species = action.payload
            })
            .addCase(speciesAsync.rejected, (state, action) => {
                state.status = false
                state.error = action.payload
            })
    },
})

export default pokemonSlice.reducer