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
    roles: {
      type: DataTypes.ENUM("NORMAL_USER", "SUPER_USER"),
    }
  },
  {
    // Other model options go here
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

// `sequelize.define` also returns the model
User.sync();
module.exports = User;
