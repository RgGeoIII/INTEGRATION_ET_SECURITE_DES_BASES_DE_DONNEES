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

| VM             | Rôle                        | Adresse IP         |
|----------------|-----------------------------|---------------------|
| `2301 (Lamp)`  | Base de données (MySQL)     | `192.168.4.9`       |
| `2302 (BackendAPI)` | Backend Node.js          | `192.168.4.8`       |
| `2303 (CrocoGym)`   | Frontend (HTML/CSS)      | `192.168.4.7`       |

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

## 🚀 Lancer le projet!


### 1. 🛠️ Backend (sur VM 2302)

```bash
cd backend
npm install
node index.js
```
---

## 🤖 Auteur

**Geoffrey Rouvel**  
Étudiant à l’IPSSI | Administrateur Systèmes & Réseaux  
GitHub : [@RgGeolll](https://github.com/RgGeolll)

---

## 🏢 Architecture Réseau

[Architecture logicielle](https://github.com/user-attachments/assets/6b3c6108-45e3-4933-ab8d-7eabd9ffd71b)

--

🎓 Projet réalisé dans le cadre du module **Integration et sécurité des bases de données** – Mastère Cybersécurité & Cloudcomputing.
