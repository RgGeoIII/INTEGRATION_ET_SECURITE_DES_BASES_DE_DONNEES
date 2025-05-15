document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const prenom = form.prenom.value;
        const nom = form.nom.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch("http://192.168.4.8:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prenom, nom, email, password }),
            });

            if (response.ok) {
                alert("Inscription réussie !");
                window.location.href = "connexion.html";
            } else {
                const data = await response.json();
                alert("Erreur : " + (data.error || "Inscription échouée"));
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur réseau : impossible de joindre le serveur.");
        }
    });
});
