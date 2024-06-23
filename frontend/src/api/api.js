import axios from "axios";

const BAKEND_URL = 'http://localhost:18080';

export const get_movies_tittle = async (movie)=>{
    const res = await axios.post(`${BAKEND_URL}/search`, {
        query: movie
    });
    return res.data.results;
}

export const get_movies_tag = async (tag)=>{
    const res = await axios.post(`${BAKEND_URL}/tag/${tag}`);
    return res.data.results;
}

export const get_movies_by_page = async (page,sizepage)=> {
    const res = await axios.get(`${BAKEND_URL}/movies/${page}/${sizepage}`);
    return res.data.movies;
}
