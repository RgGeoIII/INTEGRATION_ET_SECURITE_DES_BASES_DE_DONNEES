# 🔐Intégration et Sécurité des Bases de Données

## 📚 Objectif

Développer une application sécurisée de gestion d'abonnements à une salle de sport nommée **CrocoGym**, en mettant en œuvre :
- une **base de données relationnelle** MySQL sécurisée,
- un **backend Node.js** avec Express et authentification JWT,
- un **frontend HTML/CSS/JS simple** pour les interactions de base,
- des bonnes pratiques de sécurité : hash des mots de passe avec bcrypt, authentification par token, etc.

---

## 🧱 Architecture

### 🖥️ 3 Machines Virtuelles (VM)

| VM     | Rôle                     | Adresse IP         |
|--------|--------------------------|--------------------|
| `2301` | Base de données (MySQL)  | `192.168.4.9`      |
| `2302` | Backend Node.js          | `192.168.4.8`      |
| `2303` | Frontend (HTML/CSS)      | `192.168.4.7`      |

---

## 📦 Technologies utilisées

- **Node.js** v18
- **Express** (API REST)
- **MySQL2** (module de connexion)
- **bcrypt** (hash de mots de passe)
- **jsonwebtoken** (authentification)
- **dotenv** (variables d’environnement)
- **CORS**

---

## 🔐 Sécurité

- 🔒 Mots de passe **hashés avec bcrypt**
- 🔐 Authentification via **JWT**
- 🔐 Firewall (UFW) actif sur chaque VM
- 🔐 Séparation stricte des rôles : front / back / base
- 🔐 Requêtes SQL sécurisées via **requêtes préparées**

---

## 🗃️ Structure de la base de données

- `utilisateurs`
- `profils`
- `abonnements`
- `paiements`
- `clubs`
- `historique_visites`

(voir dossier `/database` pour le script complet de création)

---

## 🚀 Lancer le projet

### 1. 🛠️ Backend

```bash
cd backend
npm install
node index.js
```

### 1. 🛠️ FrontEnd

```bash
cd <repertoire/vers/frontend>
sudo apt install npm
npx serve .
```
---

## 🔮 Améliorations et évolutions futures
Ce projet pourrait être enrichi avec de nombreuses fonctionnalités supplémentaires si plus de temps était disponible :

## 👤 Gestion des utilisateurs
- Système de déconnexion avec suppression du token.
- Affichage complet des données personnelles depuis le backend.
- Modification du profil (email, mot de passe, avatar, etc.).

## 🧾 Paiements et abonnements
- Intégration d'une plateforme de paiement (ex : Stripe).
- Visualisation et historique des paiements.
- Souscription directe à un abonnement via l'interface.

## 🏋️ Activités & visites
- Ajout automatique dans la table historique_visites lors de la connexion.
- Statistiques dynamiques des visites par semaine, mois, etc.
- Calendrier des séances et suivi des performances.

## 📊 Tableau de bord avancé
- Dashboard interactif avec graphiques (visites, paiements...).
- Interface admin avec gestion des utilisateurs et des clubs.

## 🔐 Sécurité renforcée
- Expiration automatique du JWT (refresh token).
- Gestion des rôles (admin, coach, utilisateur).
- Logs des connexions et alertes sécurité.

---

## 🤖 Auteur

**Geoffrey Rouvel**  
Étudiant à l’IPSSI | Administrateur Systèmes & Réseaux  
GitHub : [@RgGeolll](https://github.com/RgGeolll)

---

🎓 Projet réalisé dans le cadre du module **Integration et sécurité des bases de données** – Mastère Cybersécurité & Cloudcomputing.