const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");

const Post = sequelize.define(
  "Post",
  {
    content: {
      type: DataTypes.STRING,
    },
    imagesUrl: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
    },
    usersLiked: {
      type: DataTypes.STRING,
      defaultValue: "[]",
      get() {
        return JSON.parse(this.getDataValue("usersLiked"));
      },
      set(val) {
        return this.setDataValue("usersLiked", JSON.stringify(val));
      },
    },
    usersDisliked: {
      type: DataTypes.STRING,
      defaultValue: "[]",
      get() {
        return JSON.parse(this.getDataValue("usersDisliked"));
      },
      set(val) {
        return this.setDataValue("usersDisliked", JSON.stringify(val));
      },
    },
  },
  {
    sequelize,
    tableName: "post",
    modelName: "Post",
  }
);

User.hasMany(Post);
Post.belongsTo(User);
module.exports = Post;
