document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        try {
            const res = await fetch("http://192.168.4.8:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("Réponse API :", data);

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "membre.html";
            } else {
                alert("Email ou mot de passe incorrect");
            }
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            alert("Une erreur s'est produite.");
        }
    });
});
