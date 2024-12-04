import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, MovieDetail } from '../types/movie.types';
import * as api from '../services/api';

interface MovieState {
    movies: Movie[];
    selectedMovie: MovieDetail | null;
    loading: boolean;
    error: string | null;
    totalResults: number;
    currentPage: number;
}

const initialState: MovieState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1
};

export const getLatestMovies = createAsyncThunk(
    'movies/getLatest',
    async (page: number = 1) => {
        return await api.getLatestMovies(page);
    }
);

export const searchMovies = createAsyncThunk(
    'movies/search',
    async (params: { searchTerm: string; year?: string; type?: string; page?: number }) => {
        const { searchTerm, year, type, page = 1 } = params;
        return await api.searchMovies(searchTerm, year, type, page);
    }
);

export const getMovieDetails = createAsyncThunk(
    'movies/getDetails',
    async (imdbId: string) => {
        return await api.getMovieDetails(imdbId);
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLatestMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLatestMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.Search || [];
                state.totalResults = parseInt(action.payload.totalResults) || 0;
            })
            .addCase(getLatestMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.Search || [];
                state.totalResults = parseInt(action.payload.totalResults) || 0;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMovie = action.payload;
            })
            .addCase(getMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    }
});

export const { clearSelectedMovie, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
