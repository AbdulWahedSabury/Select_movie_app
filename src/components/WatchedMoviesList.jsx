import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onRemoveMovie }) {
    return (
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie movie={movie} onRemoveMovie ={onRemoveMovie} key={movie.imdbID} />
        ))}
      </ul>
    );
  }