document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // ⚠️ évite le rechargement de la page

        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch("http://192.168.4.8:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert("Email ou mot de passe incorrect !");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            // 🔁 Redirection vers la page membre
            window.location.href = "membre.html";
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            alert("Erreur réseau ou serveur.");
        }
    });
});
