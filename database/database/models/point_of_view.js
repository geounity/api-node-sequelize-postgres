"use strict";

const Sequelize = require("sequelize");
class PointOfView extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  PointOfView.init(
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      cant_people: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
      }
    },

    // Configuración
    {
      sequelize,
      modelName: "pointOfView"
    }
  );
  PointOfView.associate = models => {
    PointOfView.belongsTo(models.debate, {
      foreignKey: "debateId",
      as: "pointsOfView"
    });
    PointOfView.belongsTo(models.geopolitic, {
      foreignKey: "geopoliticId"
    });
    PointOfView.belongsTo(models.ideologic, {
      foreignKey: "ideologicId"
    });
    PointOfView.belongsTo(models.organization, {
      foreignKey: "organizationId"
    });
  };

  return PointOfView;
};
