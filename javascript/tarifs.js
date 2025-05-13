function ajouterAuPanier(nom, prix) {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const index = panier.findIndex(item => item.nom === nom);

    if (index !== -1) {
        panier[index].quantite += 1;
    } else {
        panier.push({ nom, prix, quantite: 1 });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.href = "panier.html"; // ou ../html/panier.html selon structure
}