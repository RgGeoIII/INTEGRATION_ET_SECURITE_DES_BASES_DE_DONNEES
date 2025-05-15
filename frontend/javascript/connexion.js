document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch("http://192.168.4.8:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Échec de la connexion");

            const data = await response.json();
            localStorage.setItem("token", data.token);

            // Redirection vers l’espace membre
            window.location.href = "membre.html";
        } catch (err) {
            alert("Email ou mot de passe incorrect !");
            console.error(err);
        }
    });
});
