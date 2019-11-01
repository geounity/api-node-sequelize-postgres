"use strict";
const debug = require("debug")("geounity:db:geopolitic");

module.exports = function GeopoliticService(GeopoliticModel) {
  async function create(obj) {
    const created = await GeopoliticModel.create(obj);
    return (
      created ||
      Promise.reject(new Error(`Geopolitic exists with same name ${obj.name}`))
    );
  }

  async function getContinents() {
    const result = await GeopoliticModel.findAll({
      where: {
        level: 2
      }
    });
    return result || Promise.reject(new Error("No cant read the continents"));
  }

  async function getCountries() {
    const result = await GeopoliticModel.findAll({
      where: {
        level: 3
      }
    });
    return result || Promise.reject(new Error("No cant read the continents"));
  }

  async function getByLevel(level) {
    return (
      GeopoliticModel.findOne({
        where: { level }
      }) || Promise.reject(new Error("Error, no find by level"))
    );
  }

  async function getUuidByNameAndLevel(name, level) {
    const result = await GeopoliticModel.findOne({
      where: {
        name,
        level
      },
      attributes: ["uuid"],
      raw: true
    });
    return result.uuid || Promise.reject(new Error("Error, no find by level"));
  }

  async function getCountriesByContinent(continent) {
    debug(`List countries by continent ${continent}`);
    const uuid = await this.getUuidByNameAndLevel(continent, 2);
    const countries = await GeopoliticModel.findAll({
      where: { in_uuid: uuid }
    });
    return (
      countries ||
      Promise.reject(new Error("Can't find countries by continent"))
    );
  }

  async function getStatesByCountry(country) {
    const uuid = await this.getUuidByNameAndLevel(country, 3);
    const states = await GeopoliticModel.findAll({
      where: { in_uuid: uuid },
      raw: true
    });
    return states || Promise.reject(new Error("Can't find states by country"));
  }

  async function getCitiesByStateAndCountries(state, country) {
    // Can exists several states with same names
    debug(`List cities in ${state} in ${country}`);
    const states = await this.getStatesByCountry(country);
    const myState = states.filter(item => item.name === state);
    if (myState) {
      const cities = await GeopoliticModel.findAll({
        where: { in_uuid: myState[0].uuid },
        raw: true
      });
      return cities || Promise.reject(new Error("Can't find cities by state"));
    }
    return Promise.reject(new Error("Can't find state by country"));
  }

  return {
    create,
    getContinents,
    getCountries,
    getByLevel,
    getUuidByNameAndLevel,
    getCountriesByContinent,
    getStatesByCountry,
    getCitiesByStateAndCountries
  };
};
