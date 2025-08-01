import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import "../CssFiles/SearchResults.css";

const API_KEY = "c38c5eac";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("query");

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(query || "");

    useEffect(() => {
        if (query) {
            fetchMovies(query);
        }
    }, [query]);

    const fetchMovies = async (searchTerm) => {
        setLoading(true);
        try {
            const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
            setMovies(res.data.Search || []);
        } catch (err) {
            console.error("Error fetching movies:", err);
            setMovies([]);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/search?query=${searchQuery.trim()}`);
    };

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

    return (
        <div className="search-page">

            
            {/* Reusable Search Bar */}

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for Movies..."
                    className="search-movie"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">Search</button>
            </form>
            
            <h2 className="results-heading">Results for: <strong>{query}</strong></h2>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="search-results-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                onFavorite={addToFavorites}
                                favoriteContent={"Add to Favorite🤍"}
                            />
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
