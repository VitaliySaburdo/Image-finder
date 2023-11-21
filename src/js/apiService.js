import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31530619-c8ff0ea55f4ca3c44478c1e7e';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 20;
  }

  async fetchSearchQuery() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.per_page,
    });

    const url = `${BASE_URL}?${searchParams}`;

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
