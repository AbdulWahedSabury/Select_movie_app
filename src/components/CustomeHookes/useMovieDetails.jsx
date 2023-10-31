import { useEffect, useState } from "react";

export function useMovieDetails(id,apikey){
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
          async function fetchMovieDetails() {
            try {
              setError("");
              setIsLoading(true);
              const response = await fetch(
                `http://www.omdbapi.com/?apikey=${apikey}&i=${id}`
              );
              if (!response.ok)
                throw new Error("Some thing is wrong please try again");
              const data = await response.json();
              if (data.Response === "False")
                throw new Error("The Movie not found!");
              setMovie(data);
            } catch (err) {
              setError(err.message);
            } finally {
              setIsLoading(false);
            }
          }
          fetchMovieDetails();
        },
        [id]
        );
    return {movie,isLoading,error}
}