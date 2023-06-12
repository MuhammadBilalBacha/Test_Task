import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllLocations = createAsyncThunk('locations/all', async (id: number, thunk) => {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${id}`);
    const data = response.json();
    return data;
})

export const fetchLocationCharacters = createAsyncThunk('locations/character', async (id: any, thunk) => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    const data = response.json();
    return data;
})

export const fetchCharacters = createAsyncThunk('characters/all', async (residents: any, thunk) => {
    const responseUrls = await Promise.all(
        residents.map(async (url: string) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        })
    );
    return responseUrls;
})

const initialState = {
    entities: [],
    locations: [],
    locations_characters: [],
    characters: [],
    loading: false,
    original_characters: [],
} as any;

const rickySlice = createSlice({
    name: 'ricky_and_morty',
    initialState,
    reducers: {
        filterDead(state, action) {
            const filter_dead = state.original_characters.filter((obj: any) => obj.status === action.payload);
            state.characters = [...filter_dead];
        },
        filterAlive(state, action) {
            const filter_alive = state.original_characters.filter((obj: any) => obj.status === action.payload);
            state.characters = [...filter_alive];
        },
        filterUnknown(state, action) {
            const filter_unknown = state.original_characters.filter((obj: any) => obj.status === action.payload);
            state.characters = [...filter_unknown];
        }
    },
    extraReducers: (builder) => {
        // Fetch Locations
        builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
            state.locations = action.payload
        })
        builder.addCase(fetchAllLocations.rejected, (state, action) => {
            state.loading = true;
        })
        // Fetch Characters
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.characters = action.payload;
            state.original_characters = action.payload;
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = true;
        })
    }
})

export const { filterAlive, filterDead, filterUnknown } = rickySlice.actions;


export const rickyReducer = rickySlice.reducer;

