//importation de express
require("dotenv").config();
const bcrypt = require("bcrypt");

const cors = require("cors");
const express = require("express");
const path = require("path");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comments");
//importation de l'instance sequelize
const { sequelize } = require("./models");
const User = require('./models/user')
//pour creer une application express
const app = express();
app.use(express.json());
async function createAdminUser () {
  const adminFound = await User.findOne({ where: { pseudo: "admin" } })
  if(!adminFound){
      bcrypt
      .hash("admin", 10)
      .then((hash) => {
      const user = new User({
        pseudo: "admin",
        email :"admin@groupomania.com",
        password: hash,
        roles: "SUPER_USER"
      })
      user.save();
    })
  }
}
app.use((req, res, next) => {
  //qui peut acceder à l'API
  res.setHeader("Access-Control-Allow-Origin", "*");
  //quels headers sont autorisés
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //quels méthodes sont possibles
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Gestion des principaux chemins de l'API posts, auth, images
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postsRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comments", commentsRoutes);

createAdminUser();

//creation de tables dans notre database en fonction des models que nous avons
app.listen({ port: process.env.PORT }, async () => {
  console.log(`Server up on http://localhost:${process.env.PORT}`);
  console.log("Database synced");
});

//exportation de app js pour pouvoir l'utiliser depuis un autre fichier
module.exports = app;
