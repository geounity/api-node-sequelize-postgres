const debug = require("debug")("geounity:store:debate");

// Instancia de base de datos con Sequelize
const db = require("database_geounity_sequelize");

let service, debatePG;

const getDebates = async () => {
  debug("Get all debates");
  try {
    service = await db();
  } catch (e) {
    return next(e);
  }
  debatePG = service.Debate;
  let debates = await debatePG.getDebates(true);
  return debates;
};

const saveDebate = async (username, community, debate) => {
  debug("Save new debate");
  try {
    service = await db();
  } catch (e) {
    return next(e);
  }
  debatePG = service.Debate;
  let newDebate = await debatePG.saveDebate(username, community, debate);
  return newDebate;
};

const getDebateById = async id => {
  debug(`Getting debate by ID {id}`);
  try {
    service = await db();
    debatePG = service.Debate;
    let debate = await debatePG.findById(id);
    return debate;
  } catch (e) {
    return new Error(`Not find debate for id: ${id}`);
  }
};

const createPointOfView = async (name, idDebate) => {
  debug(`Creating point of view ${name} for debate with id ${idDebate}`)
  try {
    service = await db()
    pointOfViewPG = service.PointOfView
    let pointOfView = await pointOfViewPG.createPointOfView(name, idDebate)
    return pointOfView
  } catch (e) {
    return new Error(`Can't created point of view ${name}`)
  }
}

module.exports = {
  saveDebate,
  getDebates,
  getDebateById,
  createPointOfView
};
