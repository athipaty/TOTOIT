import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./conponents/Header";
import Search from "./conponents/Seach";
import Content from "./conponents/Content";
import Buttons from "./conponents/Buttons";

export default function App() {
  const [movies, setMovies] = useState([]);

  const [serchValue, setSearchValue] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favoritemovies, setFavoriteMovies] = useState([]);

  const [showFavoriteMovies, setShowFavoriteMovies] = useState(false)

  // set seach value base on what user input
  const handleChange = (e) => setSearchValue(e.target.value);

  // fetch popular movie as default
  const fetchPopularMovie = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c8bebd847d4df8b92eeedfa23986fc0c`);

      setMovies(response.data.results);
    } catch (error) { 
      console.error(error); 
    }
  };

  // fetch whatever user input
  const fetchSearchMovie = async (e) => {
    try {
      const respond = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=c8bebd847d4df8b92eeedfa23986fc0c&query=${serchValue}`
      );

      setMovies(respond.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  
  // Show a details of clicked movie when user click each movie
  const handleDetails = (movie) => setSelectedMovie(movie);
  
  // Remove a details of clicked movie when user click wherever
  const handleCloseDetails = () => setSelectedMovie(null);

  // add the movie to favorite list when user click favorite button
  const handleFavorite = (movie) => {

    // check if that movie already at favorite list or not
    const isFavorite = favoritemovies.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      // if yes, remove movie from favorites
      setFavoriteMovies((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== movie.id),
      );
    } else {
      // if no, add movie to favorites
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  // show favorite list when user click on favorite button
  const handleShowFavorite = () => {
    setSearchValue("");
    setShowFavoriteMovies(true);
    setMovies(favoritemovies);
    
  }

  const handleShowPopular = () => {
    setSearchValue("");
    setShowFavoriteMovies(false);
  }

  useEffect(() => {
    if (showFavoriteMovies) {
      setMovies(favoritemovies);
      
    } else {
      // Fetch popular or search movies based on the condition
      if (serchValue === "") {
        fetchPopularMovie();
      } else {
        fetchSearchMovie();
      }
    }
  }, [serchValue, showFavoriteMovies, favoritemovies]);

  return (
    <div className="container">
      <Header />
      <Search
      serchValue={serchValue}
      handleChange={handleChange} 
      />
      <Buttons 
      handleShowFavorite={handleShowFavorite}
      handleShowPopular={handleShowPopular}
      />
      <Content 
        movies={movies} 
        selectedMovie={selectedMovie}
        handleDetails={handleDetails}
        handleCloseDetails={handleCloseDetails}
        handleFavorite={handleFavorite}
        favoritemovies={favoritemovies}
      />
    </div>
  );
}
