import '../CssFiles/Favorites.css';
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(favs);
    }, []);

    const handleFavoriteToggle = (movie) => {
        const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((movie) => (
                        <div className="favorite-card-wrapper" key={movie.imdbID}>

                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onFavorite={handleFavoriteToggle}
                            favoriteContent={"Remove from Favorite❎"}
                        />
                            </div>

                    ))}
                </div>
            ) : (
                <div className="favorites-empty">
                    <h2>Your Favorite Movies</h2>
                    <p>No favorites yet!</p>
                </div>
            )}
        </div>
    );
}

export default Favorites;
