import axios from 'axios';
import config from 'config';

const FLICKER_API_KEY = config.FLICKER_API_KEY;

const defaultParams = {
  method: 'flickr.photos.search',
  api_key: FLICKER_API_KEY,
  format: 'json',
  nojsoncallback: 1,
};

const apiUrl = config.API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const flickerApi = (textToSearch, nextPage) => {
  const params = {
    ...defaultParams,
    tags: textToSearch,
    per_page: 50,
    page: nextPage,
  };

  const qs = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return instance.get(`/services/rest/?${qs}`);
};
