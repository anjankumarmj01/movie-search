import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, SearchResults } from '../../types/types';

interface SearchState {
  results: Movie[];
  searchTerm: string;
}

const initialState: SearchState = {
  results: [],
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResults>) => {
      state.results = action.payload.Search; // Set the search results
    },
    clearSearchResults: (state) => {
      state.results = []; // Clear the search results
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchResults, clearSearchResults, setSearchTerm } =
  searchSlice.actions;
export default searchSlice.reducer;
