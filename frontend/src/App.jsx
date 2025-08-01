import "./CssFiles/App.css";
import Favorites from "./Pages/Favorites";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MovieSearch from "./Components/MovieSearch";
import SearchResults from "./Pages/SearchResults";
import MovieDetails from "./Pages/MovieDetails"; 

function App() {
  return (
    <div>
      <NavBar />
      <MovieSearch/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
