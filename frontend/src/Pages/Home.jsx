import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import "../CssFiles/Home.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your key

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // 🟡 Fetch default movies on load
    useEffect(() => {
        const fetchDefaultMovies = async () => {
            try {
                const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`);
                setMovies(res.data.Search || []);
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };

        fetchDefaultMovies();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/search?query=${searchQuery.trim()}`);
        setSearchQuery("");
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
        <div className="home">
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

            <h2><span className="popular-movies">Popular Movies</span></h2>
            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} onFavorite={addToFavorites} favoriteContent={"Add to Favorite🤍"}/>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
}

export default Home;
