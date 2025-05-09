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
function stockUserData () {
    const description = inputDescription.value;
    const amount = inputAmount.value;
    const categorie = inputCategories.value;

    tabDetails.push(description);
    tabDetails.push(amount);
    tabDetails.push(categorie);
}

// Stocker mon sous-tableau dans mon tableau
function stockTabDetails () {
    tabGlobal.push(tabDetails);
}

// Montrer la liste des éléments inscrits
function displayDetailsList () {
    const lastDetail = tabGlobal[tabGlobal.length-1];

    displayDetails.innerHTML += `<div data-item="${tabGlobal.length}">${lastDetail[0]} - ${lastDetail[1]} - ${lastDetail[2]} <button class="delete">❌</button></div>`;
}

// Montrer le montant total
let totalAmount = 0;
function displayTotalAmount() {
    totalAmount = 0;
    tabGlobal.forEach(function (detail) {
        totalAmount += parseFloat(detail[1]);
        console.log(detail);
        console.log(detail[1]); 
    })
    displayTotal.innerHTML = `<span>${totalAmount}€</span>`;
}

// ==== Evénements ====
// Pour ajouter mes éléments
btnSpending.addEventListener("click", function (event) {
    event.preventDefault();

    if (inputDescription.value === "" || inputAmount.value === "" || inputCategories.value === "") {return alert("Vous devez remplir les champs !");};

    stockUserData();
    stockTabDetails();
    displayDetailsList();
    displayTotalAmount();

    // Réinitialiser les champs du formulaire
    inputDescription.value = "";
    inputAmount.value = "";
    inputCategories.value = "";
    // Réinitialiser le sous-tableau à chaque click
    tabDetails.length = 0;
    // Réinitialiser le focus dans le premier champ
    inputDescription.focus();
})

// Pour supprimer mes éléments
displayDetails.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        const item = event.target.parentElement;
        const indexItem = Array.from(item.parentElement.children).indexOf(item);
        // Retirer tab + html 
        tabGlobal.splice(indexItem, 1); 
        item.remove();

        // Modifier le montant
        displayTotalAmount();
    }
})





// const totalAmount = tabGlobal.reduce((total, newValue) => total + parseFloat(newValue[1]), 0);