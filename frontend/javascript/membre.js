document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Vous devez être connecté.");
        window.location.href = "connexion.html";
        return;
    }

    try {
        const res = await fetch("http://192.168.4.8:3000/api/profil", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Token invalide ou session expirée");

        const user = await res.json();
        document.getElementById("prenom").textContent = user.prenom;
        document.getElementById("email").textContent = "Email : " + user.email;
    } catch (err) {
        console.error(err);
        alert("Erreur d'authentification. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}
