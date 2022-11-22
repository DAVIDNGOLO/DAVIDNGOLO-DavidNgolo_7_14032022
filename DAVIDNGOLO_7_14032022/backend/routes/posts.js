const express = require("express");

//Définition des chemins posts, athorisation et multer qui serviront pour le router

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postsCtrl = require("../controllers/posts");
const router = express.Router();

//Chaque route à son CRUD (get, post, delete, put) avec son chemin et ses droits
router.post("/", auth, multer, postsCtrl.createPosts);
router.put("/:id", auth, multer, postsCtrl.modifyPosts);
router.delete("/:id", auth, postsCtrl.deletePosts);
router.get("/:id", auth, postsCtrl.getOnePosts);
router.get("/", auth, postsCtrl.getAllPosts);
router.post("/:id/like", auth, postsCtrl.createLike);

module.exports = router;
