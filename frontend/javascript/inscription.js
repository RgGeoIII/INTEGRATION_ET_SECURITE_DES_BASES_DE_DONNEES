// Attends que tout le DOM (HTML) soit chargé avant d'exécuter ce script
document.addEventListener("DOMContentLoaded", () => {
    // Récupère le formulaire présent sur la page (balise <form>)
    const form = document.querySelector("form");

    // Ajoute un écouteur d'événement sur la soumission du formulaire
    form.addEventListener("submit", async (e) => {
        // Empêche le rechargement de la page
        e.preventDefault();

        // Récupère les valeurs saisies dans les champs du formulaire
        const prenom = form.prenom.value;
        const nom = form.nom.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Envoie une requête POST vers l’API /api/register avec les infos en JSON
            const response = await fetch("http://192.168.4.8:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prenom, nom, email, password }),
            });
            // Si l'inscription a réussi
            if (response.ok) {
                alert("Inscription réussie !");
                window.location.href = "connexion.html"; // Redirige vers la page de connexion
            } else {
                // Sinon, récupère le message d'erreur renvoyé
                const data = await response.json();
                alert("Erreur : " + (data.error || "Inscription échouée"));
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur réseau : impossible de joindre le serveur.");
        }
    });
});
