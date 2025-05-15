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

async function deleteProfile() {
    if (!confirm("Es-tu sûr de vouloir supprimer ton profil ? Cette action est irréversible.")) {
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://192.168.4.8:3000/api/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Erreur : " + (errorData.message || "Impossible de supprimer le profil."));
            return;
        }

        // Suppression réussie
        localStorage.removeItem("token");
        alert("Ton compte a été supprimé. À bientôt !");
        window.location.href = "../../index.html";
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Une erreur s'est produite lors de la suppression.");
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "connexion.html";
}
