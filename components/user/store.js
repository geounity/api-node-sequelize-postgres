const debug = require("debug")("geounity:store:user");

const Model = require("./model");
const db = require("postgres-geounity");

let service, userPG;

const addUser = async user => {
  debug("Save new user");
  const myUser = new Model(user);
  myUser.save();
  try {
    service = await db();
    userPG = service.User;
    let newUser = await userPG.saveUser(user);
    return newUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUsers = async filterUser => {
  debug("List of users");
  let filter = {};
  if (filterUser) {
    filter = { username: filterUser };
  }
  const users = await Model.find(filter);
  return users;
};

const updateUser = async (username, payload) => {
  debug("Update user");
  let foundUser = await Model.findOne({
    username
  });
  // update in Mongo
  try {
    service = await db();
    userPG = service.User;
    const updatedUser = await userPG.updateInfo(username, payload);
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserById = async id => {
  debug("User by id");
  try {
    service = await db();
  } catch (error) {
    return next(e);
  }
  userPG = service.User;
  const user = await userPG.findById(id);
  return user;
};

const getUsernameByEmail = async email => {
  debug(`Username by email ${email}`);
  try {
    service = await db();
    userPG = service.User;
    const user = await userPG.findByEmail(email);
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  getUserById,
  getUsernameByEmail
};
