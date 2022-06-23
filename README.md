# Projet de fin d'année CIR2 2022
Ce projet a été réalisé avec les isenniens de Caen

# Commandes
```
ssh user1@10.10.51.57
```
```
ssh user2@10.10.51.57
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
``GET 10.10.51.57/match/? accesstoken=emailstockédans$_cookie``

## Page 3
### Créer un match<br>
``POST 10.10.51.57/create_match type_sport=4 nb_player_min=2 nb_player_max=6 adress=6 rue du clair de lune Nantes time=2022-06-15-14:00 timestamp=2:00 price=ballon dédicacé``
### Gérer un match
``PUT 10.10.51.57/manage_match``<br>
``DELETE 10.10.51.57/manage_match``<br>
### Saisies statistiques<br>
``POST 10.10.51.57/stat_match/ matchid= score=18 mvp=email_player``

## Page 4
### Editer profil
``GET api.php/account/ access_token=user_token``
``PUT 10.10.51.57/manage_account/ access_token=aznveeroybklsdhrmc age=19 city=14320``
``PUT api.php/notation grade=3``
### Stats
``GET 10.10.51.57/nbmatchs/?email=email$_SESSION``<br>
``GET 10.10.51.57/notifications/? access_token``
