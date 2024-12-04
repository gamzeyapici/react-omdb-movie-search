export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieDetail extends Movie {
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    imdbRating: string;
}

export interface SearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
}
