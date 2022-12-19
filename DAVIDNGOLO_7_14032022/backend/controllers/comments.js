
const Comments = require("../models/comments");
//FileSaver.js est la solution pour enregistrer des fichiers côté client
const fs = require("fs");

exports.createComments = (req, res, next) => {
  const commentsObject = JSON.parse(req.body.comment);
  
  const comments = new Comments({
    ...commentsObject,
    imagesUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    
  }); //les images et textes doivent etre traité différement, elles sont appelées via leur URI
  
  comments
    .save()
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComments = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id} })
  
    .then((comments) => {
      const filename = comments.imagesUrl.split("/images/")[1]; //Pour la suppression des images, utilisation de Split
      fs.unlink(`images/${filename}`, () => {
        comments
          .destroy({ where: {id: req.params.id} })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
  