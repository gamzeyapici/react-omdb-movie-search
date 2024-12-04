import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const MovieTable = () => {
    const { movies, loading, error } = useSelector((state: RootState) => state.movies);
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!movies.length) {
        return (
            <div className="text-center mt-5">
                <h3>Welcome to Movie Search</h3>
                <p className="text-muted">Use the search bar above to find movies and TV series</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover movie-table">
                <thead>
                    <tr>
                        <th className="title-col">Title</th>
                        <th className="year-col">Year</th>
                        <th className="imdb-col">IMDB ID</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr
                            key={movie.imdbID}
                            onClick={() => navigate(`/movie/${movie.imdbID}`)}
                            className="clickable-row"
                        >
                            <td>{movie.Title}</td>
                            <td>{movie.Year}</td>
                            <td>{movie.imdbID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieTable;
