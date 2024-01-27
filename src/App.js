import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./conponents/Header";
import Search from "./conponents/Seach";
import Content from "./conponents/Content";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);

  const [serchValue, setSearchValue] = useState("");

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

  useEffect(() => {

    // fetch popular movie as default if seach field is emtry
    if (serchValue === "") {
      fetchPopularMovie();
    } 
    
    // if search field is not emtry then fetch search movie
    else {
      fetchSearchMovie();
    }
  }, [serchValue]);

  return (
    <div className="container">
      <Header />
      <Search handleChange={handleChange} />
      <Content movies={movies}/>
    </div>
  );
}
