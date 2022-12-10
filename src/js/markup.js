export class MarkupUpdate {
  constructor() {}
  markupListUpdate(counties) {
    return counties
      .map(country => {
        return `<li class="country-list__item">
            <img src="${country.flags.svg}" alt="" width='20px', height ='15px'/>
            <h2 class="country-list__title">${country.name.common}</h2>
            </li>`;
      })
      .join('');
  }
  markupCountryUpdate(country) {
    const languages = Object.values(country[0].languages).join(', ');
    return `<p class="country-info__text">Capital: ${country[0].capital}</p>
        <p class="country-info__text">Population: ${country[0].population}</p>
        <p class="country-info__text">Languages: ${languages}</p>`;
  }
}
