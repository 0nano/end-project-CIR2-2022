# Projet de fin d'année CIR2 2022
Ce projet a été réalisé entre les isennien(nes) de Caen et Nantes, il a pour but de mettre en oeuvre les connaissances de PHP, SQL(postgresql), Ajax.

# Installation
Apache2
php7.4
lib-apache 2 php
postgresql
lip-apache psql

# Postgresql
DB_SERVER = '127.0.0.1';
DB_PORT = '5432';
DB_NAME = 'db_fysm';
DB_USER = 'fysm';
DB_PASSWORD = 'fysmpass';

# Commandes
```
ssh user1@10.10.51.57

mdp : oF*A6%dhg5J$Qx4
```
```
ssh user2@10.10.51.57

mdp : isen35
```
```
psql db_fysm fysm

mdp : fysmpass
```

# Login et Mot de passe de certains utilisateurs
Sachant que tout les utilisateurs peuvent créer ou s'inscrire à un match, voilà différents utilisateurs:

```
login : dt@test.com

mdp : 1234
```
```
login : clement.jaminion@isen-ouest.yncrea.fr

mdp : G55A8mzvcWdB45x
```
```
login : mr@test.com

mdp : 1234
```
# REST
## Page 1
``POST 10.10.51.57/login email=email password=password`` //Les infos sont transmise par la méthode POST <br>
``POST 10.10.51.57/register firstname=firstname lastname=lastname city=city email=email pwd=pwd verifpwd=verifpwd``//photo est transmise en tant que Blob au fichier PHP en transmettant seulement la donnée

## Page 2
//all pour tous les champs non renseignés
### Recherche
``GET 10.10.51.57/search/?city=caen&sport=basket&periode=7&match=all``<br>
``GET 10.10.51.57/search/?city=all&sport=basket&periode=30&match=complet``
### Affichage d'un match
``GET 10.10.51.57/detail/?id_match=id_match``<br>
``POST 10.10.51.57/inscription_match/ id_match email=emailsotckédans$_SESSION``
### Mes matchs
``GET 10.10.51.57/match/? accesstoken``

## Page 3
### Créer un match<br>
``POST 10.10.51.57/create_match type_sport=4 nb_player_min=2 nb_player_max=6 adress=6 rue du clair de lune city=Nantes time=2022-06-15-14:00 timestamp=2:00 price=ballon dédicacé``
### Gérer un match
``PUT 10.10.51.57/manage_match``<br>
``DELETE 10.10.51.57/manage_match``<br>
### Saisies statistiques<br>
``POST 10.10.51.57/stat_match/ matchid= score=18 mvp=email_player``

## Page 4
### Editer profil
``GET api.php/account/ access_token``
``PUT 10.10.51.57/manage_account/ access_token age=19 city=14320``
``PUT api.php/notation grade=3``
### Stats
``GET 10.10.51.57/nbmatchs/?email=email$_SESSION``<br>
``GET 10.10.51.57/notifications/? access_token``
``POST 10.10.51.57/manage_notifications/ access_token id_match email_player ``

