const winloc = window.location.search;
const urlParams = new URLSearchParams(winloc);
const countryName = urlParams.get("country");
const mainContainer = document.querySelector(".country-info");
const loade = document.querySelector(".loader");
console.log(countryName);
const countryApi = `https://restcountries.com/v3.1${countryName}`;
async function reques(res) {
  loade.style.display = "flex";
  const req = await fetch(res);
  const data = await req.json();
  loade.style.display = "none";
  aboutCountry(data);
}
reques(countryApi);

function aboutCountry(countries) {
  mainContainer.innerHTML = "";
  let country
  country = countries[0] 
    mainContainer.innerHTML += `
    <img
    class="country-info__img"
    src=${country.flags.svg}
    alt="germany-flag"
    width="560"
    height="400"
  />
  <div class="country-info__content">
    <h2>${country.name.common}</h2>
    <ul class="country-info__list">
      <li class="country-info__item">
        <p class="name">
          Native Name:
          <span>${Object.values(country.name.nativeName)[0].official},</span>
        </p>
        <p class="population">
          Population:
          <span>${country.population}</span>
        </p>
        <p class="region">
          Region:
          <span>${country.region}</span>
        </p>
        <p class="sub-region">
          Sub Region:
          <span>${country.subregion}</span>
        </p>
        <p class="capital">
          Capital:
          <span>${country.capital ? country.capital : "No capital"} </span>
        </p>
      </li>
      <li class="country-info__item">
        <p class="name">
          Top Level Domain:
          <span>${country.tld}</span>
        </p>
        <p class="population">
          Currencies:
          <span>${Object.values(country.currencies)[0].name}</span>
        </p>
        <p class="region">
          Languages:
          <span>${Object.values(country.languages)}</span>
        </p>
      </li>
    </ul>

    <div class="country-info__borders">
      <h3>Border Countries:</h3>
      ${country.borders ? country.borders.map((border) => {
        return `
        <a href="./about.html?country=/alpha/${border}">${border}</a>
        `
      }) : "no borders"}   
     
    </div>
  </div> 
     `;
  

 
  return mainContainer;
}
