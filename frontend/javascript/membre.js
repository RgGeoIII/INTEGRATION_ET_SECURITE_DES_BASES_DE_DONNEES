document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    // Vérification du token dès le chargement
    if (!token) {
        console.warn("Aucun token trouvé,redirection vers connexion.html");
        window.location.href = "connexion.html";
        return;
    }

    try {
        const response = await fetch("http://192.168.4.8:3000/api/profil", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.warn("Réponse non OK, redirection");
            throw new Error("Token invalide ou expiré");
        }

        const user = await response.json();
        console.log("Utilisateur connecté :", user);

        // Injecte les infos utilisateur dans le HTML
        const span = document.querySelector(".highlight");
        if (span) span.textContent = user.prenom;

        const emailP = document.getElementById("email");
        if (emailP) emailP.textContent = "Email : " + user.email;

    } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err.message);
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});

// 🔒 Déconnexion
function logout() {
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}
