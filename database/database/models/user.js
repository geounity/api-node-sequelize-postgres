"use strict";

const Sequelize = require("sequelize");
class User extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notEmpty: true,
          len: [3, 15]
        },
        set(val) {
          this.setDataValue("username", val.toLowerCase());
        }
      },
      email: {
        type: DataTypes.STRING(254),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          max: 254
        }
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      service: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      link: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      id_doc_firestore: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      photo: {
        type: DataTypes.STRING(160),
        allowNull: true
      },
      showAge: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      showName: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      datebirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      can_create_debate_global: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      can_create_debate_continent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      can_create_debate_nation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
      }
    },

    // Configuration
    {
      sequelize,
      modelName: "user"
    }
  );
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.debate, {
      foreignKey: "userId",
      as: "debates",
      onDelete: "CASCADE"
    });
    User.hasMany(models.poll, {
      foreignKey: "userId",
      as: "polls",
      onDelete: "CASCADE"
    });
    User.hasMany(models.aim, {
      foreignKey: "userId",
      as: "aims",
      onDelete: "CASCADE"
    });
    User.hasMany(models.opinion, {
      foreignKey: "userId",
      as: "opinions",
      onDelete: "CASCADE"
    });
    User.hasMany(models.question, {
      foreignKey: "userId",
      as: "questions",
      onDelete: "CASCADE"
    });
    User.hasMany(models.answer, {
      foreignKey: "userId",
      as: "answers",
      onDelete: "CASCADE"
    });
    User.hasMany(models.subquestion, {
      foreignKey: "userId",
      as: "subquestions",
      onDelete: "CASCADE"
    });
    User.hasMany(models.donation, {
      foreignKey: "userId",
      as: "donations",
      onDelete: "CASCADE"
    });
    User.hasMany(models.communityFund, {
      foreignKey: "userId",
      as: "communityFunds",
      onDelete: "CASCADE"
    });
    User.hasMany(models.resourcesMaterial, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    User.belongsTo(models.geopolitic, {
      foreignKey: "geopoliticUuid",
      as: "habitant"
    });
    User.belongsToMany(models.organization, {
      through: "Rel_user_organization"
    });
    User.belongsToMany(models.ideologic, {
      through: "Rel_user_ideologic"
    });
    User.belongsToMany(models.communityResourcesHuman, {
      through: "Rel_user_communityResourcesHumans"
    });
    User.hasMany(models.complaint, {
      foreignKey: "userId",
      as: "complaints",
      onDelete: "CASCADE"
    });
    User.hasMany(models.likesAim, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    User.hasMany(models.likesDebate, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    User.hasMany(models.likesStatic, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    User.hasMany(models.likesOpinion, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };

  return User;
};
