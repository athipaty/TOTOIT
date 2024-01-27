export default function Content({ movies }) {
    return (
      <div className="content">
        {movies.map((item, index) => (

        // check if the path work or not | render only working one
          item.poster_path && (
            <div key={index}>
              <p>{item.title}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
            </div>
          )
        ))}
      </div>
    );
  }
  