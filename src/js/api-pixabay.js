const axios = require('axios').default;

const API_KEY = '36867238-d18d023007d9afe06dc91b3fb';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
      this.searchQuery = '';
    this.page = 1;
    this.currentHits = 0;
  }

  getImages() {
    return axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&safesearch=true&orientation=horyzontal&page=${this.page}&per_page=40`
      )
        .then(response => {
          this.page += 1;
          this.currentHits += response.data.hits.length;
          console.log(this.currentHits);
            return response.data;
      });
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}