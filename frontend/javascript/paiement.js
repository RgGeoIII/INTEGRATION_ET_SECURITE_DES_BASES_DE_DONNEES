function chargerCommande() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const itemsContainer = document.getElementById("commande-items");
    const totalElement = document.getElementById("total");
    let total = 0;

    itemsContainer.innerHTML = "";
    panier.forEach(item => {
        const ligne = document.createElement("p");
        ligne.textContent = `${item.nom} x ${item.quantite} - ${(item.prix * item.quantite).toFixed(2)}€`;
        itemsContainer.appendChild(ligne);
        total += item.prix * item.quantite;
    });

    totalElement.textContent = total.toFixed(2).replace('.', ',') + "€";
}

document.getElementById("form-paiement").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Paiement effectué avec succès ! Merci pour votre inscription.");
    localStorage.removeItem("panier");
    window.location.href = "../../index.html";
});

window.onload = chargerCommande;