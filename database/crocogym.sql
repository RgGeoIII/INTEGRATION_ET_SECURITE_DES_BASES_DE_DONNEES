CREATE TABLE utilisateurs (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              prenom VARCHAR(100),
                              nom VARCHAR(100),
                              email VARCHAR(191) UNIQUE NOT NULL,
                              mot_de_passe VARCHAR(255) NOT NULL,
                              type_utilisateur ENUM('admin', 'utilisateur') DEFAULT 'utilisateur' NOT NULL,
                              date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE profils (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         utilisateur_id INT NOT NULL,
                         date_naissance DATE,
                         genre VARCHAR(20),
                         avatar_url VARCHAR(255),
                         FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

CREATE TABLE abonnements (
                             id SERIAL PRIMARY KEY,
                             nom VARCHAR(100) NOT NULL,
                             prix DECIMAL(8,2) NOT NULL,
                             description TEXT
);


CREATE TABLE paiements (
                           id SERIAL PRIMARY KEY,
                           utilisateur_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
                           abonnement_id INT NOT NULL REFERENCES abonnements(id),
                           montant DECIMAL(8,2) NOT NULL,
                           date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           statut VARCHAR(50) -- 'réussi', 'échoué', 'en_attente', etc.
);

CREATE TABLE clubs (
                       id SERIAL PRIMARY KEY,
                       nom VARCHAR(100) NOT NULL,
                       ville VARCHAR(100)
);

CREATE TABLE historique_visites (
                                    id SERIAL PRIMARY KEY,
                                    utilisateur_id INT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
                                    club_id INT REFERENCES clubs(id),
                                    date_visite TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);