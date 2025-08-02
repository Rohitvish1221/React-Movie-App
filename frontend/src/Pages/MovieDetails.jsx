import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CssFiles/MovieDetails.css";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your key

function MovieDetails() {
    const { id } = useParams(); // 👈 imdbID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
                setMovie(res.data);
            } catch (err) {
                console.error("Error fetching movie details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const addToFavorites = (movie) => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favs.some((m) => m.imdbID === movie.imdbID)) {
            favs.push(movie);
            localStorage.setItem("favorites", JSON.stringify(favs));
            alert("Added to Favorites!");
        } else {
            alert("Already in Favorites!");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!movie || movie.Response === "False") return <div>Movie not found.</div>;
    
    return (
        <>
        <div className="topButtons">
        {/* 🔙 Back Button */}
        <button className="back-btn" onClick={() => Navigate(-1)}>⬅ Back</button>

        {/* ❤️ Favorite Button */}
        <button className="favorite-btn" onClick={() => addToFavorites(movie)}>
            Add to Favorite🤍
        </button>
        </div>

        <div className="movie-details">

            <div className="movie-info">
                <div className="left">
                    <img src={movie.Poster} alt={movie.Title} />
                    <h2>{movie.Title} ({movie.Year})</h2>
                </div>
                <div className="right">
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Released:</strong> {movie.Released}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    
                </div>
            </div>

        </div>
        </>
    );
}

export default MovieDetails;
