import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails, clearSelectedMovie } from '../store/movieSlice';
import { AppDispatch, RootState } from '../store/store';

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { selectedMovie, loading, error } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetails(id));
        }
        return () => {
            dispatch(clearSelectedMovie());
        };
    }, [dispatch, id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!selectedMovie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
                Back to List
            </button>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={selectedMovie.Poster}
                        alt={selectedMovie.Title}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{selectedMovie.Title}</h1>
                    <div className="mb-3">
                        <strong>Duration:</strong> {selectedMovie.Runtime}
                    </div>
                    <div className="mb-3">
                        <strong>Genre:</strong> {selectedMovie.Genre}
                    </div>
                    <div className="mb-3">
                        <strong>Director:</strong> {selectedMovie.Director}
                    </div>
                    <div className="mb-3">
                        <strong>Cast:</strong> {selectedMovie.Actors}
                    </div>
                    <div className="mb-3">
                        <strong>IMDB Rating:</strong> {selectedMovie.imdbRating}
                    </div>
                    <div className="mb-3">
                        <strong>Plot:</strong>
                        <p>{selectedMovie.Plot}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
