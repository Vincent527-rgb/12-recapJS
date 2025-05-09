// ==== Sélection ====
const inputDescription = document.querySelector("#description");
const inputAmount = document.querySelector("#amount");
const inputCategories = document.querySelector("#categorie");
const btnSpending = document.querySelector("button");

const displayDetails = document.querySelector(".details-list");
const displayTotal = document.querySelector(".amount-list");

// ==== Variables ====
const tabGlobal = []; // mon grand tableau
const tabDetails = []; // mon sous-tableau de collecte d'informations

// ==== Fonctions ====
// Récupérer les données de l'utilisateur et les mettre dans mon sous-tableau
// todo: mettre des variables plutôt que des arguments? Ne pas créer de sous-tableau avec une constance et utiliser return (retourne un tableau?) ?
function stockUserData (description, amount, categorie) {
    description = inputDescription.value;
    amount = inputAmount.value;
    categorie = inputCategories.value;

    tabDetails.push(description);
    tabDetails.push(amount);
    tabDetails.push(categorie);
}

// Stocker mon sous-tableau dans mon tableau
function stockTabDetails () {
    tabGlobal.push(tabDetails);
}

// Montrer la liste des éléments inscrits
// todo: trouver une façon de cibler les éléments? ou de les séparer autrement
function displayDetailsList () {
    displayDetails.innerHTML += `<div data-item="${tabGlobal.length}">${tabGlobal[tabGlobal.length-1]} <button class="delete">❌</button></div>`;
}

// Montrer le montant total
// todo: compléter plus tard pour faire l'addition des montants (et la soustraction lors du retrait?)
function displayTotalAmount() {
    displayTotal.innerHTML += `<span>${tabDetails[1]}</span>`;     
}

// ==== Evénements ====
// Pour ajouter mes éléments
btnSpending.addEventListener("click", function (event) {
    event.preventDefault();

    if (inputDescription.value == "" || inputAmount.value == "" || inputCategories.value == "") return alert("Vous devez remplir les champs !");

    stockTabDetails(stockUserData());
    displayDetailsList();
    displayTotalAmount();

    // Réinitialiser les champs du formulaire
    inputDescription.value = "";
    inputAmount.value = "";
    inputCategories.value = "";
})

// Pour supprimer mes éléments
displayDetails.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        const item = event.target.parentElement;
        const indexItem = Array.from(item.parentElement.children).indexOf(item);
        // Retirer tab + html 
        tabGlobal.splice(indexItem, 1); 
        item.remove();

        // todo: modifier également le montant
    }
})