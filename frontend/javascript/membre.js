document.addEventListener("DOMContentLoaded", async () => {
    // Vérifie si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "connexion.html";
        return;
    }

    // (Optionnel) Récupérer les infos du profil depuis l'API
    try {
        const response = await fetch("http://192.168.4.8:3000/api/profil", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Token invalide");
        }

        const user = await response.json();
        console.log("Bienvenue", user);

        // Exemple : injecter le prénom dans la page
        const span = document.querySelector(".highlight");
        if (span) {
            span.textContent = user.prenom;
        }
    } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err);
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});
