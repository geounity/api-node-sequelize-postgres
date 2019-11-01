"use strict";

const Sequelize = require("sequelize");
class LikesStatic extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  LikesStatic.init(
    {},

    {
      sequelize,
      modelName: "likesStatic"
    }
  );
  LikesStatic.associate = models => {
    LikesStatic.belongsTo(models.user, {
      foreignKey: "userId"
    });
    LikesStatic.belongsTo(models.static, {
      foreignKey: "staticId"
    });
  };

  return LikesStatic;
};
