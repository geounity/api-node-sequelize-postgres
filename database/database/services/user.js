"use strict";
const debug = require("debug")("geounity:db:user");

// const uuid = require('uuid-base62')
// const utils = require('./utils')

module.exports = function setupUserService(UserModel) {
  // function _saveImage (image, callback) {}
  // Guarda la foto de perfil del usuario

  function findById(id) {
    return UserModel.findByPk(id);
  }

  function findByUsername(username) {
    debug(`User find by username: ${username}`);
    return UserModel.findOne({
      where: {
        username
      }
    });
  }

  async function findByEmail(email) {
    debug(`User find by email: ${email}`);
    const q = await UserModel.findOne({
      where: {
        email
      },
      raw: true
    });
    return q || Promise.reject(new Error("No se encontro por email"));
  }

  function findByName(name) {
    debug(`User find by name: ${name}`);
    return UserModel.findAll({
      where: {
        name
      }
    });
  }

  function findConnected() {
    return UserModel.findAll({
      where: {
        connected: true
      }
    });
  }

  function findAll() {
    return UserModel.findAll();
  }

  async function saveUser(user) {
    const cond = {
      where: { username: user.username }
    };
    const existingUser = await UserModel.findOne(cond);
    if (!existingUser) {
      const newUser = (await UserModel.create(user)).toJSON();
      return newUser;
    }
    return Promise.reject(new Error("User already exists"));
  }

  async function addPhotoURL(username, photo) {
    const result = await UserModel.update(
      {
        photo
      },
      {
        where: { username }
      }
    );
    return result || Promise.reject(new Error("Photo no add"));
  }

  async function updateInfo(username, payload) {
    debug(`Update user ${username}`)
    const result = await UserModel.update(
      payload,
      {
        where: { username }
      }
    );
    return result || Promise.reject(new Error("Info user no add"));
  }

  return {
    findById,
    findByUsername,
    findByEmail,
    findByName,
    findConnected,
    findAll,
    saveUser,
    addPhotoURL,
    updateInfo
  };
};
