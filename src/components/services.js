import axios from 'axios';

const KEY = '4c723f08ea7a4a76125776c3387f72cf';


export const getFilmsByUsersQuery = (query = '', page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
};

export const getMostPopularFilms = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${KEY}`,
  );
};

