const app = function(){

const request = new XMLHttpRequest();
request.open('GET', "https://restcountries.eu/rest/v2/all");
request.addEventListener('load', function(){
  const jsonString = this.responseText;
  localStorage.setItem('all countries', jsonString);

  const countries = JSON.parse(jsonString)

  populateSubRegionList(countries)
  console.log(countries);

  const dropdownSR = document.getElementById('options');
  dropdownSR.addEventListener('change', onSRChange)
  const dropdownCountries = document.getElementById('countries');
  dropdownCountries.addEventListener('change', onCountriesChange);

});
request.send();
}


//Dropdown 1:
const populateSubRegionList = function(array){
  subregionArray = [];
  array.forEach(function(item){
    if(!subregionArray.includes(item.subregion) && item.subregion !== ""){
    subregionArray.push(item.subregion);
  }
  });
  fillDropdown(subregionArray.sort(), 'options');
}

// const populateCountryList = function(array, filterArray){
//   countryArray = [];
//     array.forEach(function(item){
//
//     });
// }

const fillDropdown = function(array, parentId){
  const dropdown = document.getElementById(parentId);
  dropdown.innerText = "";
  array.forEach(function(item){
    const option = document.createElement('option');
    option.innerText = item;
    option.value = item;
    dropdown.appendChild(option);
  });
}

const onSRChange = function(){
  const countriesJson = localStorage.getItem('all countries');
  const countries = JSON.parse(countriesJson);
  const countryArray = [];
  const subRegion = this.value;
  countries.forEach(function(country){
    if(country.subregion === subRegion){
      countryArray.push(country.name);
    }
  });
  fillDropdown(countryArray, 'countries');
}

document.addEventListener('DOMContentLoaded', app);
