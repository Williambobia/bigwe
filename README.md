# BIGWE TECH & MANAGEMENT SARL

Site vitrine statique de **BIGWE TECH & MANAGEMENT SARL**, société à responsabilité limitée dont le siège est à Kinshasa.

Le contenu public reprend le logo, les statuts signés à Kinshasa le 10 septembre 2026, et les numéros de téléphone communiqués pour le site. Le capital social et le premier gérant ne sont pas affichés.

Les dates de naissance, domiciles personnels et signatures présents dans les statuts ne sont pas publiés.

## Voir le site en local

Le site n'a pas besoin de Node.js, de PHP ni de base de données. Un petit serveur local suffit, car les chemins sont relatifs.

Dans le dossier du projet :

```powershell
python -m http.server 8080
```

Ouvrir ensuite [http://localhost:8080](http://localhost:8080).

Pour arrêter le serveur : `Ctrl+C`.

## E-mail

Les téléphones affichés sont le +243 999 944 572 et le +243 822 017 588. L'e-mail n'est pas encore indiqué. Pour l'ajouter, modifier `js/site-config.js` :

```js
window.SITE_CONFIG = {
  email: "contact@exemple.com"
};
```

Ne pas y placer de mot de passe, de jeton ou de clé.

## Formulaire de contact

Le formulaire vérifie les champs dans le navigateur, puis s'arrête. **Aucun message n'est envoyé** : ce dépôt ne contient pas de backend.

Pour un envoi réel, il faudra plus tard un service externe (formulaire hébergé) ou un serveur. Cette configuration devra rester hors du dépôt s'il s'agit d'une clé ou d'un secret. Le commentaire en tête du formulaire, dans `contact.html`, le rappelle.

## Fichiers

```text
index.html              Accueil
about.html              À propos
services.html           Activités
organisation.html       Organisation
institutionnel.html     Informations institutionnelles
contact.html            Contact
404.html                Page introuvable
css/style.css           Styles
js/script.js            Menu, année, formulaire
js/site-config.js       Adresse e-mail, lorsqu'elle sera connue
images/                 Logo
favicon/                Icône du site
vendor/bootstrap/       Bootstrap 5.3.3 (fichier local)
```

Bootstrap est copié dans le projet. Les icônes sont des SVG dans les pages, afin de ne pas charger de bibliothèque distante.

## Créer le dépôt GitHub

1. Créer un compte sur [https://github.com](https://github.com) si besoin.
2. Cliquer sur **New repository**.
3. Choisir un nom, par exemple `bigwe`.
4. Laisser le dépôt **public** si la vitrine doit être visible avec GitHub Pages.
5. Ne pas ajouter de README, de `.gitignore` ni de licence : ils existent déjà dans le projet.
6. Créer le dépôt.

## Envoyer le projet

Git doit être installé. Dans le dossier du projet :

```powershell
git init
git add .
git status
git commit -m "Publier le site vitrine de BIGWE TECH & MANAGEMENT SARL"
git branch -M main
git remote add origin https://github.com/VOTRE_COMPTE/bigwe.git
git push -u origin main
```

Remplacer `VOTRE_COMPTE` et `bigwe` par le compte et le nom du dépôt.

Avant `git add`, vérifier avec `git status` que **`Statuts.pdf` n'apparaît pas**. Ce fichier contient des données personnelles (dates de naissance, adresses privées, signatures). Il est ignoré par `.gitignore` et ne doit pas être publié. Ne pas le glisser non plus dans l'interface de GitHub.

## Activer GitHub Pages

1. Ouvrir le dépôt sur GitHub.
2. Aller dans **Settings**, puis **Pages**.
3. Dans **Build and deployment**, source : **Deploy from a branch**.
4. Branch : **main**, dossier : **/ (root)**.
5. Enregistrer.

La mise en ligne prend souvent une minute. L'entrée **Pages** affiche ensuite l'adresse du site.

## Adresse publique

Pour un dépôt de projet, l'adresse a cette forme :

```text
https://VOTRE_COMPTE.github.io/bigwe/
```

GitHub Pages sert le site en HTTPS. Il n'y a rien à installer côté serveur.

## Sécurité de cette vitrine

C'est un site statique. Il n'a pas de compte utilisateur, pas de base de données et pas d'authentification. La politique de sécurité du contenu est déclarée dans chaque page (`Content-Security-Policy`) : scripts, styles et images viennent du site lui-même.

GitHub Pages ne permet pas d'ajouter tous les en-têtes HTTP (par exemple `frame-ancestors`). La protection complémentaire est le HTTPS fourni par `github.io`, l'absence de secrets dans le code, et le fait de ne pas publier les statuts complets.

## Mettre à jour un texte

Modifier la page HTML concernée, puis :

```powershell
git add .
git commit -m "Mettre à jour le contenu de la page"
git push
```

GitHub Pages republie la branche `main` après le push.
