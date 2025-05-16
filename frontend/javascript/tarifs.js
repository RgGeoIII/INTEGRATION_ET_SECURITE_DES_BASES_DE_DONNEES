// Fonction qui permet d'ajouter un article au panier
function ajouterAuPanier(nom, prix) {
    // Le panier actuel est récupéré
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const index = panier.findIndex(item => item.nom === nom);

    // Si l'article existe déja, une incrémentation de la quantité à lieu
    if (index !== -1) {
        panier[index].quantite += 1;
    } else {
        //sinon, un nouvel objet réprésentant l'article est rajouté
        panier.push({ nom, prix, quantite: 1 });
    }

    // Sauvegarde du panier mis à jour dans le LocalStorage
    localStorage.setItem("panier", JSON.stringify(panier));

    // rédirige l'utilisateur vers le panier
    window.location.href = "panier.html"; // ou ../html/panier.html selon structure
}