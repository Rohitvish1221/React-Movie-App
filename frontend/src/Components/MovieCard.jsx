import '../CssFiles/MovieCard.css';
import { Link } from "react-router-dom";
function MovieCard({ movie, onFavorite, favoriteContent }) {
    return (
        <div className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
            <button className="favorite-btn" onClick={() => onFavorite(movie)}>
                {favoriteContent}
            </button>
            <Link to={`/movie/${movie.imdbID}`} className="details-link">
                View Details
            </Link>
        </div>

    );
}

export default MovieCard;
