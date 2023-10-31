import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar"
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loading from "./components/Loading";
import ErrorMsg from "./components/ErrorMsg";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MoiveDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

const apikey = "2e1d66c3";

export default function App() {
  const [movies, setMovies] = useState([]);

  const [watched, setWatched] = useState(function(){
    const watched = localStorage.getItem('watched');
    return JSON.parse(watched);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddMovie (movie){
    setWatched((watched) => [...watched, movie]);
  }
  function handleCancelSelectedId() {
    setSelectedId(null);
  }
  function handleRemoveMovie (id){
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useEffect(function(){
    localStorage.setItem('watched',JSON.stringify(watched));
  },[watched])
  
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`
          );

          if (!response.ok) {
            throw new Error("some Thing is wrong please try again");
          }
          const data = await response.json();
          if (data.Response === "False") {
            throw new Error("Movies not found.");
          }
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
        if (query.length < 3) {
          setMovies([]);
          setError();
          return;
        }
      }
      fetchMovies();
    },
    [query]
  );
  
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {error && <ErrorMsg error={error} />}
          {!isLoading && !error && (
            <MovieList handleSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              onAddMovie = {handleAddMovie}
              id={selectedId}
              handleCancelSelectedId={handleCancelSelectedId}
              apikey={apikey}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList onRemoveMovie={handleRemoveMovie} watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

