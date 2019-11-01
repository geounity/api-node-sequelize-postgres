"use strict";

const Sequelize = require("sequelize");
class LikesAim extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  LikesAim.init(
    {},

    {
      sequelize,
      modelName: "likesAim"
    }
  );
  LikesAim.associate = models => {
    LikesAim.belongsTo(models.user, {
      foreignKey: "userId"
    });
    LikesAim.belongsTo(models.aim, {
      foreignKey: "aimId"
    });
  };

  return LikesAim;
};
