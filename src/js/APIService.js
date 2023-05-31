import axios from "axios";
import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.5.min.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '22757150-c2d7916cb8ffee93e4314d78c';

export default class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
    this.totalHits = null;
    this.totalPages = null;
    this.endOfHits = false;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  getOptions() {
    const options = new URLSearchParams({
      key: `${API_KEY}`,
      q: `${this.searchQuery}`,
      page: `${this.page}`,
      per_page: `${this.PER_PAGE}`,
      image_type: 'photo',
      orientation: 'horisontal',
      safesearch: true,
    });
    return options;
  }
  resetPage() {
    this.page = 1;
  }
  resetEnd() {
    this.endOfHits = false;
  }

  async fetchImages() {
    try {
      const getOptions = this.getOptions();
      const response = await axios.get(`?${getOptions}`);
      const data = await response.data;

      this.totalHits = data.totalHits;
      this.totalPages = Math.ceil(this.totalHits / this.PER_PAGE);
      this.resetEnd();

        if (data.total === 0) {
          throw new Error('Oops, something went wrong. Repeat your request');
        }

        const images = await data.hits;
        this.page += 1;
        this.imagesFinished();
        return images;
    } catch {
      Notiflix.Notify.failure(error.message);
    }
  }

  imagesFinished() {
    if (this.page === this.totalPages) {
      this.endOfHits = true;
      Notiflix.Notify.info("These were all the results");
    }
  }
}
