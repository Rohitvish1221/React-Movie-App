// MovieSearch.jsx
import React, { useState } from "react";

const MovieSearch = () => {
    const [] = useState("");
    const [movie] = useState(null);


    return (
        <div className="p-4 max-w-md mx-auto">
        

            {movie && movie.Response !== "False" && (
                <div className="mt-4 border p-4 shadow">
                    <h2 className="text-xl font-bold">{movie.Title}</h2>
                    <p>{movie.Year} | {movie.Genre}</p>
                    <img src={movie.Poster} alt={movie.Title} className="w-48 mt-2" />
                    <p className="mt-2">{movie.Plot}</p>
                </div>
            )}

            {movie && movie.Response === "False" && (
                <p className="mt-4 text-red-500">Movie not found.</p>
            )}
        </div>
    );
};

export default MovieSearch;
