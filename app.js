let countries = [];

const getCountry = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(res.status);
    }
    countries = await res.json();
console.log(countries);
    renderCountry(countries[43]); //Türkiye 43 te oldugu için ordan baslasın
    findCountry();
  } catch (error) {
    console.log(error);
  }
};
//API den gelen countries e göre yeni ülke kardları olusturma
const renderCountry = (country) => {
  const card = document.querySelector(".card");
  const {
    flags: { png },
    name: { common },
    region,
    capital,
    population,
    languages,
    currencies,
    borders,
    maps:{googleMaps}
  } = country;

  const languageList = Object.values(languages).join(", ");
  const currencyList = Object.keys(currencies)
    .map((key) => {
      const currency = currencies[key];
      return `${currency.name} (${currency.symbol})`;
    })
    .join(", ");
  const borderList = borders ? borders.join(", ") : "None";

  card.innerHTML = `
        <img src="${png}" class="card-img-top shadow" alt="${common}" />
        <div>
          <h5 class="p-2 text-center">${common}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-landmark"></i>
            <span class="fw-bold"> Capital:</span> ${capital}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-comments"></i>
            <span class="fw-bold"> Languages:</span> ${languageList}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-money-bill-wave"></i>
            <span class="fw-bold"> Currencies:</span> ${currencyList}
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-people-group"></i>
            <span class="fw-bold"> Population:</span> ${population}
          </li>
          <li class="list-group-item">
            <i class="fa-sharp fa-solid fa-road-barrier"></i>
            <span class="fw-bold"> Borders:</span> ${borderList}
          </li>
          <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="${googleMaps}" target='_blank'> Go to google map</a> </li>
        </ul>
    `;
  // Body arkaplan
  document.body.style.backgroundImage = `url(${png})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.height = "100vh";
};
//input arama fonksiyonumuz
const findCountry = () => {
  const input = document.querySelector("#search");
  const searchDiv = document.querySelector("#searchDiv");
  searchDiv.style.backgroundColor = "white";

  input.addEventListener("input", () => {
    const searchValue = input.value.toLowerCase();
    searchDiv.innerHTML = "";

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );

    if (filteredCountries.length === 1) {
      renderCountry(filteredCountries[0]);
      searchDiv.innerHTML = "";
      return;
    }

    filteredCountries.forEach((country) => {
      const span = document.createElement("span");
      span.classList.add("list");
      span.textContent = country.name.common;
      span.addEventListener("click", () => {
        renderCountry(country);
        searchDiv.innerHTML = "";
        input.value = country.name.common;
      });
      searchDiv.appendChild(span);
    });
  });
};

document.addEventListener("DOMContentLoaded", getCountry);
