import React, { useEffect, useState } from "react";
import { My_axios_Instance, images_baseURL } from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await My_axios_Instance.get(
          requests.fetchNetflixOriginals
        );
        // console.log(JSON.stringify(response));
        const results = await response.data.results;
        // console.log("Final result:", results);
        const randomPick = Math.random() * results.length;
        setMovie(results[Math.floor(randomPick)]);
      } catch (error) {
        console.log("Error occured while fetching data " + error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${images_baseURL}${movie?.backdrop_path})`,
        }}
      >
        {/* {console.log(
          ` test image url: ${images_baseURL}${movie?.backdrop_path}`
        )} */}

        <div className="featured">
          <div className="featured-title">
            <h1>{movie?.original_name}</h1>
          </div>
          <div className="featured-buttons">
            <button className="play_btn">Play</button>
            <button className="my_list_btn">My List</button>
          </div>
          <div className="featured-description">
            <p>{String(movie?.overview).substring(0,150)+'...'}</p>
          </div>
        </div>
        {/* <div className="featured_fade_bottom"></div> */}
      <div className="featured_fade_bottom"></div>
      </div>
    </>
  );
}

export default Banner;
