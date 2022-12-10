import { Notify } from 'notiflix';

export class FetchCountries {
  constructor() {
    this.searchQuery = '';
  }
  fetchCountry() {
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json();
    });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery.trim();
  }
}
