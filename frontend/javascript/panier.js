// Fonction pour afficher les éléments du panier sur la page
function afficherPanier() {
    // Récupère les éléments du panier depuis le LocalStorage ou initialise un tableau vide
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Récupère les éléments du DOM ou les items
    const container = document.getElementById("panier-items");
    const totalElem = document.getElementById("total-price");

    //Vide le contenu actuel du panier
    container.innerHTML = "";
    let total = 0;

    //Parcourt chaque item du panier pour l'afficher dynamiquement
    panier.forEach((item, index) => {
        const ligne = document.createElement("div");
        ligne.className = "panier-item";

        // Génération du html pour chaque ligne d'article
        ligne.innerHTML = `
        <span><strong>${item.nom}</strong> - ${item.prix.toFixed(2)}€ x ${item.quantite}</span>
        <div>
          <button onclick="changerQuantite(${index}, -1)">-</button>
          <button onclick="changerQuantite(${index}, 1)">+</button>
          <button onclick="retirerDuPanier(${index})">Retirer</button>
        </div>
      `;

        // Ajoute la ligne dans le conteneur
        container.appendChild(ligne);

        //Met à jour l'addition
        total += item.prix * item.quantite;
    });

    //Afiche le total formaté
    totalElem.textContent = total.toFixed(2).replace('.', ',') + "€";
}
// Permet de modifier la quantité d'un article depuis le panier
function changerQuantite(index, delta) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    // Modifie la quantité
    panier[index].quantite += delta;

    //Condition pour la quantité si elle est égale à 0
    if (panier[index].quantite <= 0) panier.splice(index, 1);

    // Met a jour le panier ddans le local Storage
    localStorage.setItem("panier", JSON.stringify(panier));

    // Réaffiche le panier mis à jour
    afficherPanier();
}

// Fonction pour retirer un article du panier
function retirerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    // Suprime l'article du panier
    panier.splice(index, 1);
    //Mise à jour du localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    //Réaffiche le panier après suppression
    afficherPanier();
}
// Appel de la fonction quand la page est chargé
window.onload = afficherPanier;