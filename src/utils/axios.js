import axios from 'axios'

const My_axios_Instance = axios.create(
    {baseURL: 'https://api.themoviedb.org/3'}
    // The property baseURL is (case-sensitive). Axios expects baseURL as it is
);

// imdb images base url
const images_baseURL='https://image.tmdb.org/t/p/original'
export  {My_axios_Instance,images_baseURL};
