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
``PUT 10.10.51.57/connexion?mail=mail&pwd=pwd`` //demander car cela m'étonnerai que l'on mette les mdp en clair içi <br>
``POST 10.10.51.57/createaccount name=name firstname=firstname city=city mail=mail pwd=pwd verifpwd=verifpwd``//photo est dans $_FILES[]

## Page 2
### Recherche
``GET 10.10.51.57/search/?city=caen&sport=basket&periode=7&match=all``<br>
``GET 10.10.51.57/search/?city=all&sport=basket&periode=30&match=complet``
### Affichage d'un match
``GET 10.10.51.57/detail/?id_match=id_match``<br>
``POST 10.10.51.57/inscription_match/id_match email=emailsotckédans$_SESSION``
### Mes matchs
``GET 10.10.51.57/my_match/?email=emailstockédans$_SESSION``

## Page 3
### Créer un match<br>
``POST 10.10.51.57/create_match type_sport=4 nb_player_min=2 nb_player_max=6 adress=6 rue du clair de lune Nantes time=2022-06-15-14:00 timestamp=2:00 price=ballon dédicacé``
### Gérer un match
``PUT 10.10.51.57/manage_match``<br>
``DELETE 10.10.51.57/manage_match``<br>
### Saisies statistiques<br>
``POST 10.10.51.57/stat_match/ score=18 mvp=email_player``

## Page 4
### Editer profil
``PUT 10.10.51.57/manage_account/ age=19 city=14320``
### Stats
``GET 10.10.51.57/nbmatchs/?email=email$_SESSION``<br>
``GET 10.10.51.57/notifications/?email=email$_SESSION``
