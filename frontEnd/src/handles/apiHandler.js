import axios from "axios";

export const apiKey = 'd741e715fe272578d562d25d122e2e08';

const base_url = `https://api.themoviedb.org/3/movie/`;

export const movie_api = axios.create({
    baseURL: base_url,
});
