
//charge les variables d'environnement d'un .envfichier dans process.env
require("dotenv").config();
const bcrypt = require("bcrypt");
//Le CORS permet de prendre en charge des requêtes multi-origines 
//sécurisées et des transferts de données entre des navigateurs et des serveurs
const cors = require("cors");
//importation de express
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
//creation de l'admin qui aura le role de super User
async function createAdminUser () {
  const hash = await bcrypt.hash('admin',10);
  const adminFound = await User.findOne({ where: {
    pseudo: "admin"
  } })
  if(!adminFound){
      const user = new User({
        pseudo: "admin",
        email :"admin@groupomania.com",
        password: hash,
        roles: "SUPER_USER"
      })
      user.save();
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


//creation de tables dans notre database en fonction des models que nous avons
app.listen({ port: process.env.PORT }, async () => {
  console.log(`Server up on http://localhost:${process.env.PORT}`);
  console.log("Database synced");
  createAdminUser();

});

//exportation de app js pour pouvoir l'utiliser depuis un autre fichier
module.exports = app;
