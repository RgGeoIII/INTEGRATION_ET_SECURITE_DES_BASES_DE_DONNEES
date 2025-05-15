document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "connexion.html";
        return;
    }

    try {
        const response = await fetch("http://192.168.4.8:3000/api/profil", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Token invalide");

        const user = await response.json();
        console.log("Utilisateur connecté :", user);

        const span = document.querySelector(".highlight");
        if (span) span.textContent = user.prenom;

        const emailP = document.getElementById("email");
        if (emailP) emailP.textContent = "Email : " + user.email;

    } catch (err) {
        console.error("Erreur de session :", err);
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}
