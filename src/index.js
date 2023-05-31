import './sass/main.scss';
import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.6.min.css';
import ImagesAPIService from './js/APIService';
import Markup from './js/markup';

const response = await fetch('https://randomuser.me/api/', {
  method: 'GET',
  headers: {
    // set Accept header to application/json
    Accept: 'application/json',
  },
});

const formSearch = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const imagesAPIService = new ImagesAPIService();
const renderMarkup = new Markup({ selector: galleryRef });

formSearch.addEventListener('submit', onFormSearch);
loadBtn.addEventListener('click', onLoadMore);

async function onFormSearch(event) {
  event.preventDefault();
  renderMarkup.reset();
  imagesAPIService.query = event.currentTarget.searchQuery.value.trim();

  if (imagesAPIService.query === '') {
    loadBtn.classList.add('is-hidden');
    return Notiflix.Notify.info('Your query is empty. Try again!');
  }
  imagesAPIService.resetPage();

  try {
    loadBtn.classList.remove('is-hidden');
    await fetchImages();
  } catch (error) {
    loadBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure(error.message);
  }

  formSearch.reset();
}

async function onLoadMore() {
  try {
    await fetchImages();
  } catch {
    return Notiflix.Notify.failure(error.message);
  }
}

async function fetchImages() {
  try {
    loadBtn.disabled = true;
    const images = await imagesAPIService.fetchImages();
    renderMarkup.items = images;
    renderMarkup.render();
  } catch {
    return Notiflix.Notify.failure(error.message);
  }

  if (imagesAPIService.endOfHits) {
    return loadBtn.classList.add('is-hidden');
  }
  loadBtn.disabled = false;
  loadBtn.textContent = 'Load more';
}