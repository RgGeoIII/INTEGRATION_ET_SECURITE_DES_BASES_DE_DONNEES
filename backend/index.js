// Permet de charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importation des mofules nécéssaires
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Initialisation de l'application Express
const app = express();
// Middleware pour activer CORS
app.use(cors());
// Midleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Configuration de la base de données
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Middleware d'authentification JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });
        // Ajoute les données du token à la requête
        req.user = user;
        //Passe au middleware suivante
        next();
    });
}

// Inscription avec création du profil par défaut
app.post('/api/register', async (req, res) => {
    const { prenom, nom, email, password, date_naissance, genre, avatar_url } = req.body;
    try {
        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertion dans la table utilisateurs
        const [result] = await db.query(
            'INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
            [prenom, nom, email, hashedPassword]
        );

        const utilisateur_id = result.insertId;

        // Insertion dans la table profils
        await db.query(
            'INSERT INTO profils (utilisateur_id, date_naissance, genre, avatar_url) VALUES (?, ?, ?, ?)',
            [utilisateur_id, date_naissance, genre, avatar_url]
        );

        res.status(201).json({ message: 'Utilisateur et profil créés avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
});

// Connexion
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Récupération de l'utilisateur par l'email
        const [rows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Utilisateur non trouvé' });

        const user = rows[0];

        // Vérification du mot de passe avec Bcrypt
        const isMatch = await bcrypt.compare(password, user.mot_de_passe);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

        // Génération d’un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.type_utilisateur },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        // Renvoie les infos utilisateur + profil
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// Récupération du profil de l'utilisateur
app.get('/api/profil', authenticateToken, async (req, res) => {
    try {
        const [utilisateur] = await db.query(
            'SELECT u.id, u.prenom, u.nom, u.email, u.type_utilisateur, p.date_naissance, p.genre, p.avatar_url FROM utilisateurs u JOIN profils p ON u.id = p.utilisateur_id WHERE u.id = ?',
            [req.user.id]
        );
        res.json(utilisateur[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\u2705 Serveur backend démarré sur le port ${PORT}`);
});
