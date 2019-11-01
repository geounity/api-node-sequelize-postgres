const store = require("./store");

const addUser = user =>
  new Promise((resolve, reject) => {
    if (user.username) {
      if (user.username.length < 3 || user.username.length > 15) {
        reject("Username between 3 and 15 chars");
      }
    }
    if (!user.email) {
      reject("Empty email");
      return false;
    }
    store.add(user).then(res => resolve(res));
  });

const getUsers = filterUser =>
  new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
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
  addUser,
  getUsers,
  updateUser,
  getUserById,
  getUsernameByEmail
};
