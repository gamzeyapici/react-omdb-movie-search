import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import MovieTable from '../components/MovieTable';
import Pagination from '../components/Pagination';
import { searchMovies } from '../store/movieSlice';
import { AppDispatch } from '../store/store';

const DEFAULT_SEARCH = {
    term: "Pokemon",
    year: "",
    type: "movie"
};

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(searchMovies({ 
            searchTerm: DEFAULT_SEARCH.term, 
            year: DEFAULT_SEARCH.year, 
            type: DEFAULT_SEARCH.type, 
            page: 1 
        }));
    }, [dispatch]);

    const handleSearch = (searchTerm: string, year: string, type: string) => {
        dispatch(searchMovies({ 
            searchTerm, 
            year, 
            type, 
            page: 1 
        }));
    };

    const handlePageChange = (page: number) => {
        dispatch(searchMovies({ 
            searchTerm: DEFAULT_SEARCH.term,
            year: DEFAULT_SEARCH.year,
            type: DEFAULT_SEARCH.type,
            page 
        }));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Omdb List</h1>
            <SearchBar 
                onSearch={handleSearch}
                defaultSearchTerm={DEFAULT_SEARCH.term}
                defaultYear={DEFAULT_SEARCH.year}
                defaultType={DEFAULT_SEARCH.type}
            />
            <MovieTable />
            <Pagination onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;
