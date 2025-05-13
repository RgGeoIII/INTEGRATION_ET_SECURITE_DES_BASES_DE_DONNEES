function afficherPanier() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const container = document.getElementById("panier-items");
    const totalElem = document.getElementById("total-price");

    container.innerHTML = "";
    let total = 0;

    panier.forEach((item, index) => {
        const ligne = document.createElement("div");
        ligne.className = "panier-item";
        ligne.innerHTML = `
        <span><strong>${item.nom}</strong> - ${item.prix.toFixed(2)}€ x ${item.quantite}</span>
        <div>
          <button onclick="changerQuantite(${index}, -1)">-</button>
          <button onclick="changerQuantite(${index}, 1)">+</button>
          <button onclick="retirerDuPanier(${index})">Retirer</button>
        </div>
      `;
        container.appendChild(ligne);
        total += item.prix * item.quantite;
    });

    totalElem.textContent = total.toFixed(2).replace('.', ',') + "€";
}

function changerQuantite(index, delta) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier[index].quantite += delta;
    if (panier[index].quantite <= 0) panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

function retirerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

window.onload = afficherPanier;