const Posts = require("../models/post");
const fs = require("fs");
const multer = require("multer");
const User = require("../models/user");

exports.createPosts = (req, res, next) => {
  const postsObject = req.body;
  //delete postsObject._id;
  const posts = new Posts({
    ...postsObject,
    UserId: postsObject.userId,
    imagesUrl: `${req.protocol}://localhost:${process.env.PORT}/images/${req.file.filename}`,
  }); //les images et textes doivent etre traité différement, elles sont appelées via leur URI

  posts
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPosts = (req, res, next) => {
  let postsObject = {};
  console.log(req.body, req.file);
  req.file
    ? // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
      (Posts.findOne({
        where: {
          id: req.params.id,
        },
      }).then((posts) => {
        // On supprime l'ancienne image du serveur
        const filename = posts.imagesUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }),
      (postsObject = {
        // On modifie les données et on ajoute la nouvelle image
        ...req.body,
        imagesUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }))
    : // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
      // Si la modification ne contient pas de nouvelle image
      (postsObject = {
        ...req.body,
      });
  Posts.update(
    // On applique les paramètre de sauceObject
    {
      ...postsObject,
      imagesUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    },
    {
      //...postsObject,

      where: { id: req.params.id },
    }
  )
    .then(() =>
      res.status(200).json({
        message: "post modifiée !",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

exports.deletePosts = (req, res, next) => {
  Posts.findOne({ where: { id: req.params.id } })

    .then((posts) => {
      const filename = posts.imagesUrl.split("/images/")[1]; //Pour la suppression des images, utilisation de Split
      fs.unlink(`images/${filename}`, () => {
        posts
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePosts = (req, res, next) => {
  Posts.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
exports.getAllPosts = (req, res, next) => {
  //appel de toutes les sauces avec request, result et next pour passer au prochain controller
  Posts.findAll({
    include: {
      model: User,
    },
  }) //Demande à la base de données les sauces avec find
    .then((posts) => res.status(200).json(posts)) // then si le retour est ok avec le code 200
    .catch((error) => res.status(400).json({ error })); // catch si le retour est ko avec le code 400
};

exports.createLike = (req, res) => {
  //Récupération d'une seule Sauce avec 'findOne'
  const postId = req.params.id;
  Posts.findOne({
    where: { id: postId },
  })

    .then((posts) => {
      // la personne aime  la sauce
      const userId = req.body.userId;
      const userLiked = posts.usersLiked.indexOf((el) => el === userId);
      if (userLiked === 1) {
        posts.dislikes++; // ajout d'un dislike
        posts.likes--; // annulation du like
        posts.usersLiked.splice(posts.usersLiked.indexOf(userId), 1); //Suppression du like en fonction de son id
        posts.usersDisliked.push(userId); // ajout du username + dislike dans le tableau
        posts.save();
      }
      // la personne n'aime pas la sauce
      if (userLiked === -1) {
        posts.likes++; // ajout d'un like
        posts.dislikes--; // annulation du dislike
        posts.usersDisliked.splice(posts.usersDisliked.indexOf(userId), 1); // Suppression du dislike en fonction de son id
        posts.usersLiked.push(userId); // ajout du username + like dans le tableau
        posts.save();
      }

      //réponse de réussite code 200
      res.status(200).json({ message: "like pris en compte" });
    })
    .catch((error) => {
      res.status(500).json({ error });
      //réponse d'erreur avec code 500
    });
};
