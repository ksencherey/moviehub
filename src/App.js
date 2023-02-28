import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";


const apiURL = "https://www.omdbapi.com/?i=tt3896198&apikey=9cfbdc2f";

//"http://www.omdbapi.com?apikey=9cfbdc2f";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchForMovie, setSearchForMovie] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${apiURL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieHub</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchForMovie}
          onChange={(e) => {
            setSearchForMovie(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            searchMovies(searchForMovie);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
