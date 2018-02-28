/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map