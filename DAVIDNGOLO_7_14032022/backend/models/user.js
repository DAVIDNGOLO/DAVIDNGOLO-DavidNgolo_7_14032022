const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./index");
const Post = require("./post");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    postsLiked: {
      type: Sequelize.JSON,
    },
  },
  {
    // Other model options go here
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

// `sequelize.define` also returns the model

module.exports = User;
