import axios from 'axios';
import { MovieDetail, SearchResponse } from '../types/movie.types';

const API_KEY = '627e8010';
const BASE_URL = 'http://www.omdbapi.com';

export const getLatestMovies = async (page: number = 1): Promise<SearchResponse> => {
    const year = new Date().getFullYear();
    const response = await axios.get(BASE_URL, {
        params: {
            apikey: API_KEY,
            s: 'movie',
            type: 'movie',
            y: year.toString(),
            page
        }
    });
    return response.data;
};

export const searchMovies = async (
    searchTerm: string,
    year?: string,
    type?: string,
    page: number = 1
): Promise<SearchResponse> => {
    const params = {
        apikey: API_KEY,
        s: searchTerm,
        page,
        ...(year?.trim() && { y: year.trim() }),
        ...(type && { type })
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetail> => {
    const response = await axios.get(BASE_URL, {
        params: {
            apikey: API_KEY,
            i: imdbId,
            plot: 'full'
        }
    });
    return response.data;
};
