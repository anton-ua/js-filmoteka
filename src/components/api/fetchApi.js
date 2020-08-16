import axios from 'axios';

//GET/trending/
export const getMostPopularFilms = () => {
  return axios.get(
    'https://api.themoviedb.org/3/trending/all/week?api_key=4c723f08ea7a4a76125776c3387f72cf',
  );
};

export const getFilmsByUsersQuery = (query = 'most popular', page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=4c723f08ea7a4a76125776c3387f72cf&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
};

export const getFilmDetailsByID = (id = null) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4c723f08ea7a4a76125776c3387f72cf`,
  );
};

//GET /genre/movie/list
export const getFilmGenres = () => {
  return axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=4c723f08ea7a4a76125776c3387f72cf&language=en-US',
  );
};
