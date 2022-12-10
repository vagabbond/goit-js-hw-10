import './css/styles.css';
import debounce from 'lodash.debounce';
import { FetchCountries } from './js/fetchCountries';
import { MarkupUpdate } from './js/markup';
import { Notify } from 'notiflix';

const serchCountry = new FetchCountries();
const markupUpdate = new MarkupUpdate();

const DEBOUNCE_DELAY = 1000;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  country: document.querySelector('.country-info'),
};

const onSearch = e => {
  if (e.target.value === '') {
    return markupClear();
  }
  serchCountry.searchQuery = e.target.value;
  serchCountry
    .fetchCountry()
    .then(data => {
      return data.length >= 1 && data.length <= 10
        ? markupAdd(data)
        : Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
    })
    .catch(error => console.log(error));
  markupClear();
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

const markupAdd = data => {
  refs.list.innerHTML = markupUpdate.markupListUpdate(data);
  return data.length === 1
    ? (refs.country.innerHTML = markupUpdate.markupCountryUpdate(data))
    : null;
};
const markupClear = () => {
  refs.list.innerHTML = '';
  refs.country.innerHTML = '';
};
