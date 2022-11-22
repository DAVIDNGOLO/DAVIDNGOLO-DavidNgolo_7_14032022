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
      type: Sequelize.JSON,
      defaultValue: [],
      get() {
        return this.getDataValue("usersLiked");
      },
      set(val) {
        if (!Array.isArray(val)) {
          throw new Error("usersLiked must to be an array");
        }
        this.setDataValue("usersLiked", val);
      },
    },
    usersDisliked: {
      type: Sequelize.JSON,
      defaultValue: [],
      get() {
        return this.getDataValue("usersDisliked");
      },
      set(val) {
        if (!Array.isArray(val)) {
          throw new Error("usersDisliked must to be an array");
        }
        this.setDataValue("usersDisliked", val);
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
