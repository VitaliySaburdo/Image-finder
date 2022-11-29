import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchName() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '31530619-c8ff0ea55f4ca3c44478c1e7e';
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    return await axios.get(url).then(async response => {
      try {
        this.page += 1;
        return response.data;
      } catch (error) {
        console.log(error);
      }
    });
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
