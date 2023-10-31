import { useEffect, useState } from "react";
import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";
import RatingStars from "../RatingStars";
import { useMovieDetails } from "./CustomeHookes/useMovieDetails";

export default function MovieDetails({
  id,
  handleCancelSelectedId,
  onAddMovie,
  apikey,
  watched,
}) {
  const [userRating, setUserRating] = useState("");
  const {movie, error, isLoading} = useMovieDetails(id,apikey);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddMovie(newWatchedMovie);
    handleCancelSelectedId();
  }

  useEffect(function(){
    if(!title) return
    document.title = `Movie | ${title}`;
  },[title]);

  useEffect(function (){
    function callBack(e){
      if(e.code === "Escape"){
        handleCancelSelectedId();
        console.log("Escape");
      }
    }
    document.addEventListener('keydown',callBack)
     return function (){
      document.removeEventListener('keydown',callBack)
     }
  },[handleCancelSelectedId])
  const isWatched = watched.map((movie) => movie.imdbID).includes(id);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === id
  )?.userRating;

  return (
    <div className="details">
      {isLoading && <Loading />}
      {error && <ErrorMsg error={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={handleCancelSelectedId}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched && (
                <RatingStars
                  onSetRating={setUserRating}
                  maxRating={10}
                  size={24}
                />
              )}
              {isWatched ? (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              ) : (
                userRating > 0 && (
                  <button onClick={handleAdd} className="btn-add">
                    {" "}
                    Add to list
                  </button>
                )
              )}
            </div>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
