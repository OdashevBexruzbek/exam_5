const ulEL = select(".davlatlar");
const formEl = select(".search");
const bodyEl = select("body");
const loader = select(".loader");
const searchRgion = document.querySelectorAll(".search__select-list li");
const searchSpan = select(".search__select span");
let count = 1;
const mode = select(".mode");
const modeLocal =  localStorage.getItem('mode') ? localStorage.getItem('mode'): null;
if(modeLocal){
  bodyEl.classList.add('dark-mode')
} 

mode.addEventListener("click" , () => {
    bodyEl.classList.toggle('dark-mode')
    modeLocal ? localStorage.setItem('mode' , ''): localStorage.setItem("mode" , 'dark')
    console.log("a");
})

function select(a) {
  return document.querySelector(a);
}
api = `https://restcountries.com/v3.1/all`;

async function request(res) {
  loader.style.display = "flex";
  const req = await fetch(res);
  const data = await req.json();
  loader.style.display = "none";
  createCountry(data);
}
request(api);

function createCountry(countries) {
  ulEL.innerHTML = '';
  countries.forEach((country) => {
    ulEL.innerHTML += `
      <li class="davlatlar_item">
            <a href="./pages/about.html?country=/name/${country.name.common}">
              <img
                src=${country.flags.svg}
                alt="germany-flag"
                width="267"
                height="160"
              />
              <div class="cards__item-inner">
                <h3 class="cards__title">${country.name.common}</h3>
                <p class="population">Population: <span>${
                  country.population
                }</span></p>
                <p class="region">Region: <span>${country.region}</span></p>
                <p class="capital">Capital: <span>${
                  country.capital ? country.capital : "No capital"
                }</span></p>
              </div>
            </a>
      </li>
   `;
  });
  return ulEL;
}

formEl.search.addEventListener("input", () => {
  const inputValue = formEl.search.value.toLowerCase();
  const davlat = document.querySelectorAll(".davlatlar_item");
  const davlatlarNomlari = document.querySelectorAll(".cards__title");

  davlatlarNomlari.forEach((nomi, i) => {
    if (nomi.textContent.toLowerCase().includes(inputValue)) {
      davlat[i].style.display = "block";
    } else {
      davlat[i].style.display = "none";
    }
  });
});


searchRgion.forEach((li) => {
  li.addEventListener("click", () => {
    searchSpan.textContent = li.textContent;
    let newApi;
    if (li.textContent == "All") {
      newApi = "https://restcountries.com/v3.1/all";
    } else {
      newApi = `https://restcountries.com/v3.1/region/${li.textContent}`;
    }

    request(newApi);
  });
});
