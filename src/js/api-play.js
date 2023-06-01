const axios = require('axios').default;

const API_KEY = '36838905-81afad8944bf6a504726c2c1c';
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