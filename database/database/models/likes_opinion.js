"use strict";

const Sequelize = require("sequelize");
class LikesOpinion extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  LikesOpinion.init(
    {
      positive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },

    {
      sequelize,
      modelName: "likesOpinion"
    }
  );
  LikesOpinion.associate = models => {
    LikesOpinion.belongsTo(models.user, {
      foreignKey: "userId"
    });
    LikesOpinion.belongsTo(models.opinion, {
      foreignKey: "opinionId"
    });
  };

  return LikesOpinion;
};
