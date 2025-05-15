document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "connexion.html";
        return;
    }

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
        console.log("Connecté en tant que :", user.email);

        const prenomSpan = document.querySelector(".highlight");
        if (prenomSpan && user.prenom) {
            prenomSpan.textContent = user.prenom;
        }
    } catch (err) {
        console.error("Erreur de récupération du profil :", err);
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});
