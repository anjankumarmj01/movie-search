import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';

interface FavouritesState {
  favourites: Movie[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Movie>) => {
      const existingIndex = state.favourites.findIndex(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (existingIndex === -1) {
        state.favourites.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
