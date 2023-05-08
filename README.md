# 🤥 Excuses de dev'

Ce projet est une petite web-app développée en **Node.JS**.
Excuses de dev vous propose une interface Web ainsi qu'une API pour récupérer des excuses en fonction des codes HTTP demandés (par ex. 701, 705).

## 🚀 Installation

Pour installer ce projet, il est nécessaire de disposer de Node.JS ainsi que NPM installé sur votre machine. Clonez ensuite le dépôt sur votre machine et exécutez la commande suivante dans le dossier du projet :

``` 
npm install
``` 

## 📚 Dépendances

Excuses de dev' utilise **express.JS (+body-parser)** ainsi que **FS**. Ces dépendances seront automatiquement installées lors de du lancement ci-dessus.

## 🔧 Utilisation

Pour lancer l'application, exécutez la commande suivante dans le dossier du projet :

``` 
npm start
``` 

Accédez ensuite à l'interface Web à partir de l'adresse affichée dans le retour de votre terminal de commandes 💻

## 🧰 REST API

Voici les 4 endpoints disponibles depuis l'API de Excuses de dev'

```
/api/create
```
Méthode : POST. Charge à transmettre : http_code (INT), tag (string), message (string)

```
/api/[HTTPCODE]
```
Méthode : GET. Remplacez [HTTPCODE] par le code HTTP pour lequel vous souhaitez obtenir une excuse, le retour sera un tableau JSON.

```
/api/random
```
Méthode : GET. Obtenez une excuse aléatoire, le retour sera un tableau JSON

```
/api/list
```
Méthode : GET. Obtenez une liste exhaustive de toutes les excuses présentes dans la base de données des excuses
