const debug = require("debug")("geounity:controller:debate");
const store = require("./store");

const saveDebate = (username, community, debate) =>
  new Promise((resolve, reject) => {
    if (debate.title.length > 100) {
      reject('El título puede tener hasta 100 caracteres')
    }
    if (debate.description.length > 1000) {
      reject("La descrición debe tener un máximo de 1000 caracteres");
    }
    resolve(store.saveDebate(username, community, debate));
  });

const getDebates = () =>
  new Promise((resolve, reject) => {
    resolve(store.getDebates());
  });

const getDebateById = id =>
  new Promise((resolve, reject) => {
    debug(`Getting debate by ID ${id}`);
    resolve(store.getDebateById(id));
  });

const createPointOfView = (name, idDebate) =>
  new Promise((resolve, reject) => {
    debug(`Creating point of view ${name} for debate with id ${idDebate}`);
    resolve(store.createPointOfView(name, idDebate));
  });

module.exports = {
  saveDebate,
  getDebates,
  getDebateById,
  createPointOfView
};
