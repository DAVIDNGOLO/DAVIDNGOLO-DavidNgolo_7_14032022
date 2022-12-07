const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MaskData = require("maskdata");

const User = require("../models/user");

const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 4,
  unmaskedEndCharactersAfterAt: 4,
  maskAtTheRate: false,
};

const UserRole  = {
  NORMAL_USER: "NORMAL_USER",
  SUPER_USER: "SUPER_USER"
}

exports.signup = (req, res, next) => {
  //const maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        roles: UserRole.NORMAL_USER
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //bcrypt : hachage sécurisé
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "7d",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getInfos = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((infos) => res.status(200).json(infos))
    .catch((error) => res.status(404).json({ error }));
};

/*exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }})  
    .then(() => {
      user.destroy({ where: { id: req.params.id }}) 
                  .then((user) => res.status(200).json(user)
                  ({ message: 'Compte supprimé' }))
                  .catch(error => res.status(400).json({ error }));
              })
          .catch (error => res.status(500).json({ error }));
};

/*exports.updateUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }})
  .then(() => {
      user.update({ where: { id: (req.params.id)}) 
                  .then((user) => res.status(200).json(user)
                  ({ message: 'Compte supprimé' }))
                  .catch(error => res.status(400).json({ error }));
              })
          .catch (error => res.status(500).json({ error }));
};
  
*/
