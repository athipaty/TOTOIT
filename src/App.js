import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Header from "./conponents/Header";
import Search from "./conponents/Search";
import Content from "./conponents/Content";
import Buttons from "./conponents/Buttons";
import Loading from "./conponents/Loading";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoritemovies, setFavoriteMovies] = useState([]);
  const [showFavoriteMovies, setShowFavoriteMovies] = useState(false);
  const loaderRef = useRef(null);

  const handleChange = (e) => setSearchValue(e.target.value);

  const fetchPopularMovie = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=c8bebd847d4df8b92eeedfa23986fc0c`
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchMovie = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=c8bebd847d4df8b92eeedfa23986fc0c&query=${serchValue}`
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=c8bebd847d4df8b92eeedfa23986fc0c&page=${movies.length / 20 + 1}`
      );

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [movies.length]);

  const handleDetails = (movie) => setSelectedMovie(movie);

  const handleCloseDetails = () => setSelectedMovie(null);

  const handleFavorite = (movie) => {
    const isFavorite = favoritemovies.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      setFavoriteMovies((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== movie.id)
      );
    } else {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleShowFavorite = () => {
    setSearchValue("");
    setShowFavoriteMovies(true);
    setMovies(favoritemovies);
  };

  const handleShowPopular = () => {
    setSearchValue("");
    setShowFavoriteMovies(false);
  };

  useEffect(() => {
    if (!showFavoriteMovies) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            fetchMoreMovies();
          }
        },
        { threshold: 1 }
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => {
        if (loaderRef.current) {
          observer.unobserve(loaderRef.current);
        }
      };
    }
  }, [fetchMoreMovies, loading, showFavoriteMovies]);
  useEffect(() => {
    if (showFavoriteMovies) {
      setMovies(favoritemovies);
    } else {
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
      <Search serchValue={serchValue} handleChange={handleChange} />
      <Buttons
        handleShowFavorite={handleShowFavorite}
        handleShowPopular={handleShowPopular}
      />
      {loading ? (
        <Loading />
      ) : (
        <Content
          movies={movies}
          selectedMovie={selectedMovie}
          handleDetails={handleDetails}
          handleCloseDetails={handleCloseDetails}
          handleFavorite={handleFavorite}
          favoritemovies={favoritemovies}
        />
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}
