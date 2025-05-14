-- Interclassement utf8mb4_0900_ai_ci

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

-- Interclassement utf8mb4_general-ci

CREATE TABLE utilisateurs (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              prenom VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                              nom VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                              email VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci UNIQUE NOT NULL,
                              mot_de_passe VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                              type_utilisateur ENUM('admin', 'utilisateur') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'utilisateur' NOT NULL,
                              date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE profils (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         utilisateur_id INT NOT NULL,
                         date_naissance DATE,
                         genre VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                         avatar_url VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                         FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE abonnements (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             nom VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                             prix DECIMAL(8,2) NOT NULL,
                             description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE paiements (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           utilisateur_id INT NOT NULL,
                           abonnement_id INT NOT NULL,
                           montant DECIMAL(8,2) NOT NULL,
                           date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           statut VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                           FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
                           FOREIGN KEY (abonnement_id) REFERENCES abonnements(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE clubs (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       nom VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                       ville VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE historique_visites (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    utilisateur_id INT NOT NULL,
                                    club_id INT,
                                    date_visite TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
                                    FOREIGN KEY (club_id) REFERENCES clubs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
