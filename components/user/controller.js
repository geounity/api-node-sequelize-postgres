const store = require("./store");

const getUsers = filterUser =>
  new Promise(async (resolve, reject) => {
    try {
      users = await store.list(filterUser);
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });

const addUser = user =>
  new Promise((resolve, reject) => {
    if (!user.username || !user.email) {
      reject("Invalid data");
    }
    if (user.username.length < 3 || user.username.length > 15) {
      reject("Username between 3 and 15 chars");
    }
    resolve(store.add(user));
  });

const updateUser = (username, payload) =>
  new Promise((resolve, reject) => {
    console.log("Username: ", username);
    console.log("Payload: ", payload);
    resolve(store.update(username, payload));
  });

const getUserById = id =>
  new Promise((resolve, reject) => {
    resolve(store.getUserById(id));
  });

const getUsernameByEmail = email =>
  new Promise((resolve, reject) => {
    resolve(store.getUsernameByEmail(email));
  });

module.exports = {
  getUsers,
  addUser,
  updateUser,
  getUserById,
  getUsernameByEmail
};
