import React, { useEffect, useState } from "react";
import "./row.css";
import { My_axios_Instance, images_baseURL } from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await My_axios_Instance.get(fetchURL);
        // console.log(response);
        const results = await response.data.results;
        // console.log(results);
        setMovies(results);
      } catch (error) {
        console.log("error occured while fetching data: " + error);
      }
    }

    fetchMovies();
  }, [fetchURL]);

  const playTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie.original_title ||
          ""
      )
        .then((url) => {
          if (!url) {
            return false;
          }
          // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams);
          // console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.error("Error fetching the trailer:", error);
        });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row_container">
      <div className="title">
        <h2 className="list_title">{title}</h2>
      </div>
      <div className="movie_list_holder">
        {movies?.map((movie, index) => {
          // console.log(movie)
          return (
            <>
              {/* {console.log(index)}
              {console.log(movie)} */}
              <img
                key={index}
                onClick={() => playTrailer(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${images_baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            </>
          );
        })}
      </div>
      <div style={{ padding: "15px" }}>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
