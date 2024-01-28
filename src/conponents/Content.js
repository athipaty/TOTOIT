export default function Content({ movies, handleDetails, selectedMovie, handleCloseDetails, handleFavorite, favoritemovies }) {
    return (
      <div className="content">
        {movies.map((item, index) => (

        // check if the path work or not | render only working one
          item.poster_path && (
            <div key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                onClick={() => {handleDetails(item)}}
              />
            </div>
          )
        ))}
        {selectedMovie && (
          // render once select movies was clicked
        <div className="selected-overlay" onClick={handleCloseDetails}>
          <div className="selected-content">
            <div className="selectedvs-header">
              <img
                src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                alt=""
              />
              <h3>{selectedMovie.title}</h3>
              <p>{selectedMovie.release_date}</p>
            </div>
            <p>{selectedMovie.overview}</p>
            <button onClick={() => handleFavorite(selectedMovie)} >
            {favoritemovies.some((fav) => fav.id === selectedMovie.id)
              ? "Unfavorite"
              : "Favorite"}
            </button>
          </div>
        </div>
      )}
      </div>
    );
  }
  