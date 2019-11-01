"use strict";

const Sequelize = require("sequelize");
class LikesDebate extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  LikesDebate.init(
    {},

    {
      sequelize,
      modelName: "likesDebate"
    }
  );
  LikesDebate.associate = models => {
    LikesDebate.belongsTo(models.user, {
      foreignKey: "userId",
    });
    LikesDebate.belongsTo(models.debate, {
      foreignKey: "debateId"
    });
  };

  return LikesDebate;
};
