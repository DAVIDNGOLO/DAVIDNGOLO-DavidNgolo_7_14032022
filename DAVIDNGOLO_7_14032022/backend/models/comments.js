
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Comment = sequelize.define('Comment', {
  
    content: {
      type: DataTypes.STRING,
      
    },
    imagesUrl: {
      type: DataTypes.STRING,
      
    },
    likes:{
      type: DataTypes.INTEGER,
    }, 

  }, {
    sequelize,
    tableName:'comment',
    modelName: 'Comment',
  });
  User.hasMany(Comment);
  Comment.belongsTo(User);
  module.exports = Comment;
