import React, { useEffect, useState } from "react";
import { My_axios_Instance, images_baseURL } from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await My_axios_Instance.get(requests.fetchTrending);
        const results = await response.data.results;
        const randomPick = Math.random() * results.length;
        setMovie(results[Math.floor(randomPick)]);
      } catch (error) {
        console.log("Error occurred while fetching data " + error);
      }
    }
    fetchMovies();
  }, []);

  // Handle button states / clicks
  const handleButtonClick = () => {
    if (isPlaying) {
      // Close the video
      setTrailerUrl(""); // Stop the video by clearing the trailer URL
    } else {
      // Play the video
      playTrailer(movie);
    }
    setIsPlaying(!isPlaying);
  };

  // Play video functionality
  const playTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close the video if it's already playing
    } else {
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title ||
          ""
      )
        .then((url) => {
          if (!url) {
            return false;
          }
          const urlParams = new URLSearchParams(new URL(url).search);
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
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${images_baseURL}${movie?.backdrop_path})`,
        }}
      >
        <div className="featured">
          <div className="featured_left">
            <div className="featured-title">
              <h1>
                {movie?.title ||
                  movie?.name ||
                  movie?.original_name ||
                  movie?.original_title ||
                  ""}
              </h1>
            </div>
            <div className="featured-buttons">
              <button onClick={handleButtonClick} className="play_btn">
                {isPlaying ? "Close Trailer" : "Play Trailer"}
              </button>
              <button className="my_list_btn">My List</button>
            </div>
            <div className="featured-description">
              <p>{String(movie?.overview).substring(0, 150) + "..."}</p>
            </div>
          </div>
          <div
            className="trailer_container"
            style={{ padding: "15px", width: "100%" }}
          >
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
          </div>
        </div>
        <div className="featured_fade_bottom"></div>
      </div>
    </>
  );
}

export default Banner;
