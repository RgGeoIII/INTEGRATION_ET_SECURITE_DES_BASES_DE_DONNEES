document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        try {
            const response = await fetch("http://192.168.4.8:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert("Identifiants incorrects !");
                return;
            }

            const { token } = await response.json();

            localStorage.setItem("token", token);
            window.location.href = "membre.html"; // Redirection après succès
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
});
