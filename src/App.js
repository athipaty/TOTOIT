import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import { wait } from "@testing-library/user-event/dist/utils";
function App() {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=c8bebd847d4df8b92eeedfa23986fc0c");
        setMovies(getData.data.results);
      } catch (error) {
        console.log("something wend wrong" + error)
      }
    }
    fetchData();
  }, [])
  return (
    <div className="App">
      {movies.map((item) => (
        <div className="singleMovie" key={item.id}>
          <h3>{item.title}</h3>
          <img
              width={"200px"}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
            />
          <p>{item.overview}</p>
          <button>Favorite</button>
        </div>

      ))}
    </div>
  );
}


export default App;
