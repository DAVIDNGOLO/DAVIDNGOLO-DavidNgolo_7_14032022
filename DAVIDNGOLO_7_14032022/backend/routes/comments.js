
const express = require("express");

//Définition des chemins posts, athorisation et multer qui serviront pour le router

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/comments");
const router = express.Router();

//Chaque route à son CRUD (get, post, delete, put) avec son chemin et ses droits
router.post("/", auth, multer, postsCtrl.createComments);
router.delete("/:id", auth, postsCtrl.deleteComments);



module.exports = router;
