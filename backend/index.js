require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
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
        req.user = user;
        next();
    });
}

// 📩 Route d'inscription
app.post('/api/register', async (req, res) => {
    const { prenom, nom, email, password, formule } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe, formule) VALUES (?, ?, ?, ?, ?)',
            [prenom, nom, email, hashedPassword, formule]
        );
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
});

// 🔐 Route de connexion
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Utilisateur non trouvé' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.mot_de_passe);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign(
            { email: user.email, role: user.role || 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// 👤 Route protégée : profil utilisateur
app.get('/api/profil', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT prenom, nom, email, formule FROM utilisateurs WHERE email = ?',
            [req.user.email]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
    }
});

// 🚀 Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
});
