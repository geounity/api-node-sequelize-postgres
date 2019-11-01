const debug = require("debug")("geounity:store:geocommunity");

// Instancia de base de datos con Sequelize
const db = require("database_geounity_sequelize");

let service, geocommunity;

const getContinents = async () => {
  debug("List of continents");
  try {
    service = await db();
  } catch (e) {
    console.log("Error: ", e);
  }
  geocommunity = service.Geopolitic;
  let continents = await geocommunity.getContinents();
  return continents;
};

const getCountries = async () => {
  debug("List of continents");
  try {
    service = await db();
  } catch (e) {
    return next(e);
  }
  geocommunity = service.Geopolitic;
  let countries = await geocommunity.getCountries();
  return countries;
};

const getUuidGlobal = async () => {
  debug("uuid of global");
  try {
    service = await db();
  } catch (e) {
    return next(e);
  }
  geocommunity = service.Geopolitic;
  let uuid = await geocommunity.getUuidByNameAndLevel("Global", 1);
  return uuid;
};

const getCountriesByContinent = async continent => {
  debug(`List of countries in ${continent}`);
  try {
    service = await db();
  } catch (e) {
    return new Error(e)
  }
  geocommunity = service.Geopolitic;
  let countries = await geocommunity.getCountriesByContinent(continent);
  return countries;
};

const getStatesByCountry = async country => {
  debug(`List of states in ${country}`);
  try {
    service = await db();
  } catch (e) {
    return new Error(e)
  }
  geocommunity = service.Geopolitic;
  let states = await geocommunity.getStatesByCountry(country);
  return states;
};

const getCitiesByStateAndCountries = async (state, country) => {
  debug(`List of cities in ${state} in ${country}`);
  try {
    service = await db()
  } catch (e) {
    return new Error(e)
  }
  geocommunity = service.Geopolitic
  let cities = await geocommunity.getCitiesByStateAndCountries(state, country)
  return cities
};

module.exports = {
  getContinents,
  getCountries,
  getUuidGlobal,
  getCountriesByContinent,
  getStatesByCountry,
  getCitiesByStateAndCountries
};
