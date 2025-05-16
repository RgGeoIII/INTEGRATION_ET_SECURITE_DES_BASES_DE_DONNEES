document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "connexion.html";
        return;
    }

    try {
        const response = await fetch("http://192.168.4.8:3000/api/profil", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Token invalide");

        const user = await response.json();
        console.log("Utilisateur connecté :", user);

        document.querySelector(".highlight").textContent = user.prenom;
        document.getElementById("email").textContent = "Email : " + user.email;
    } catch (err) {
        console.error("Erreur profil :", err);
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}

function deleteProfile() {
    if (!confirm("Es-tu sûr de vouloir supprimer ton profil ?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Non authentifié");
        return;
    }

    fetch("http://192.168.4.8:3000/api/delete", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(async res => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Erreur inconnue");
            }
            alert("Ton compte a été supprimé.");
            localStorage.removeItem("token");
            window.location.href = "../../index.html";
        })
        .catch(err => {
            console.error("Suppression échouée :", err);
            alert("Erreur lors de la suppression.");
        });
}
