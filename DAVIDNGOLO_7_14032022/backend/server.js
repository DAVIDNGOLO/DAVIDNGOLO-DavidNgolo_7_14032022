//importer le package http de node js pour avoir les outils pour creer le serveur
const http = require('http');
//importer l'application app js
const app = require('./app');
//parametrage du port avec la methode set de express
app.set('port', process.env.Port || 3000 );
//la fonction aui sera appelé a chaque requête par le serveur
//ici les fonctions seront dans app js
const server = http.createServer(app);
//le serveur ecoute les requêtes sur le port
server.listen(process.env.Port || 3000);

