const store = require("./store");

const getContinents = () =>
  new Promise((resolve, reject) => {
    resolve(store.getContinents());
  });

const getCountries = () =>
  new Promise((resolve, reject) => {
    resolve(store.getCountries());
  });

const getUuidGlobal = () =>
  new Promise((resolve, reject) => {
    resolve(store.getUuidGlobal());
  });

const getCountriesByContinent = continent =>
  new Promise((resolve, reject) => {
    resolve(store.getCountriesByContinent(continent));
  });

const getStatesByCountry = country =>
  new Promise((resolve, reject) => {
    resolve(store.getStatesByCountry(country));
  });

const getCitiesByStateAndCountries = (state, country) =>
  new Promise((resolve, reject) => {
    resolve(store.getCitiesByStateAndCountries(state, country));
  });

module.exports = {
  getContinents,
  getCountries,
  getUuidGlobal,
  getCountriesByContinent,
  getStatesByCountry,
  getCitiesByStateAndCountries
};
