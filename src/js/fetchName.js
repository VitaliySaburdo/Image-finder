export default class NewsApiService {

  constructor () {
    this.searchQuery = '';
  }

  fetchName() {
   console.log(this)
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31530619-c8ff0ea55f4ca3c44478c1e7e';
  const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  }
  
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}




