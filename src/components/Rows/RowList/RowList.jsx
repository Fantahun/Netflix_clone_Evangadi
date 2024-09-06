import React from "react";
import Row from "../Row/Row";
import "./rowList.css";

import requests from "../../../utils/requests";

function RowList() {
  return (
    <>
      <Row
        title="Netflix Origionals"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />

      <Row title="Trending Movies" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRatedMovies} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="TV Shows" fetchURL={requests.fetchTvShow} />

    </>
  );
}

export default RowList;
