import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResults, MovieDetails } from '../types/types';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.omdbapi.com/' }),
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResults, string>({
      query: (title) =>
        `?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${title}`,
    }),
    getMovieDetails: builder.query<MovieDetails, string>({
      query: (id) => `?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = movieApi;
