document.addEventListener("DOMContentLoaded", () => {
    //Récupération du formulaire de connexion via son ID
    const form = document.getElementById("loginForm");

    //Ajout d'un écouteur d'évenement "submit" au formulaire
    form.addEventListener("submit", async (e) => {
        //Empechement du rechargement automatique de la page à la soumission
        e.preventDefault();

        //On récupère les valeurs des champs email et password et on les enlèves
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        try {
            // Envoie une requete POST à l'API
            const res = await fetch("http://192.168.4.8:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, //On envoie du json
                body: JSON.stringify({ email, password }),//envoie des identifiants dans le corps de la requete
            });

            //conversion de la réponse en json
            const data = await res.json();
            console.log("Réponse API :", data);

            //condition qui permet de voir si la réponse est ok et qu'un token a été reçu
            if (res.ok && data.token) {
                //On stocke le token dans le localstorage du navigateur
                localStorage.setItem("token", data.token);
                // redirection vers la page membre (tableau de bord)
                window.location.href = "membre.html";
            } else {
                //Si le password ou l'éreur est incorrect
                alert("Email ou mot de passe incorrect");
            }
        } catch (err) {
            // Si la requete échoue
            console.error("Erreur lors de la connexion :", err);
            alert("Une erreur s'est produite.");
        }
    });
});
