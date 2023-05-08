const express = require('express');
const app = express();
const fs= require('fs');
const bodyParser = require('body-parser');

// Import de la base de données JSON contenant les Excuses de Dev
let BDDJson= require('../bdd.json');

// Configuration d'Express pour utiliser le moteur de rendu EJS et le parser de requête POST body-parser
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Fonction retournant une entrée aléatoire du tableau JSON d'excuses
function getRandomSorry()
{
    return BDDJson[Math.floor(Math.random()*BDDJson.length)];
}
// Getter d'excuse en fonction du code HTTP renseigné en argument "HTTPCODE" (INT), retourne toujours un tableau de données
function getErrorFor(HTTPCode)
{
    tempErrorJson=[];
    // Parcours du tableau de la BDD et recherche de plusieurs correspondances pour stockage dans un tableau temporaire
    for(let i=0;i<BDDJson.length;i++)
    {
        console.log(BDDJson[i].http_code);
        if(BDDJson[i].http_code==HTTPCode)
        {
            tempErrorJson.push(BDDJson[i]);
        }
    }
    if(tempErrorJson.length>0)
    {
        // Tirage aléatoire dans le tableau temportaire afin de retourner une excuse
        return tempErrorJson[Math.floor(Math.random()*tempErrorJson.length)];
    }
    else
    {
        return { "http_code": 000,"tag": "Code introuvable","message":"Message introuvable" };
    }
}

// Création de la route principale de la page d'accueil
app.get('/',(req, res) => {
    let randomHTTPError=getRandomSorry();
    res.render('index', randomHTTPError);
});

// Création de la route lost afficheant la page 404 
app.get('/lost',(req, res) => {
    res.render('lost');
});

// Création de la route afficheant l'erreur personnalisée en fonction du code HTTP renseigné à la fin de l'URL
app.get('/:httpcode([0-9]{3})',(req, res) => {
    let HTTPError=getErrorFor(req.params.httpcode);
    res.render('specific', HTTPError);
});

// Création de la route permettant l'ajout d'une excuse dans la BDD, via une requête POST vers l'endpoint create
app.post('/api/create', (req, res) => {
    let data = req.body;
    console.log('hey', req.body);
    BDDJson.push({"http_code" : parseInt(data.http_code), "tag": data.tag, "message": data.message });

    try {
        fs.writeFileSync('./bdd.json', JSON.stringify(BDDJson, null, 2), 'utf8');
      } catch (error) {
        console.log('[Error] : ', error);
    }
    res.send(getRandomSorry());
});

// Route permettant l'affichage d'une excuse spécifique retournée au format JSON
app.get('/api/:httpcode([0-9]{3})',(req, res) => {
    let HTTPError=getErrorFor(req.params.httpcode);
    res.send(HTTPError);
});

// Route permettant l'affichage aléatoire d'une excuse extraite depuis la BDD 
app.get('/api/random',(req, res) => {
    res.send(getRandomSorry());
});

// Endpoint permettant d'obtenir une liste JSON exhaustive de toutes les excuses de dev disponibles
app.get('/api/list',(req, res) => {
    res.send(BDDJson);
});

// Catcher de toutes les autres routes non enregistrées, affichant directement une page 404
app.get('*', function(req, res){
    res.status(404).render('404');
});

// Lancement du serveur Node, affichage des messages d'initialisation
app.listen(9834, () => {
    console.log("[Excuse de dev's démarré⚡]");
    console.log("Accès à l'interface web : http://localhost:9834/");
    console.log("Accès à l'API : http://localhost:9834/api/[CODEHTTP]");
    console.log("Tous les endpoints API : GET /list GET /random POST /create");
});
