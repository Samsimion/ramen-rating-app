const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "nirvana.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "naruto.jpg", rating: 3, comment: "Rich broth!" },
    { id: 4, name: "Gyukotsu Ramen", restaurant: "Kojiro", image: "kojiro.jpg", rating: 4, comment: "Amazing taste!" }
];

let selectedRamen = null;

// Display ramen images in the menu
function displayRamens() {
    const menu = document.getElementById("ramen-menu");
    menu.innerHTML = "";

    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        menu.appendChild(img);
    });

    // Automatically display the first ramen details on page load
    if (ramens.length > 0) {
        handleClick(ramens[0]);
    }
}

// Display ramen details when clicked
function handleClick(ramen) {
    selectedRamen = ramen;
    document.getElementById("ramen-name").textContent = ramen.name;
    document.getElementById("ramen-restaurant").textContent = ramen.restaurant;
    document.getElementById("ramen-image").src = ramen.image;
    document.getElementById("ramen-rating").textContent = ramen.rating;
    document.getElementById("ramen-comment").textContent = ramen.comment;
}

// Handle new ramen submission
function addSubmitListener() {
    const form = document.getElementById("new-ramen-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const newRamen = {
            id: ramens.length + 1,
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value
        };

        ramens.push(newRamen);
        displayRamens();
        form.reset();
    });
}

// Handle editing ramen details
function addEditListener() {
    const editForm = document.getElementById("edit-ramen-form");
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (selectedRamen) {
            selectedRamen.rating = document.getElementById("edit-rating").value;
            selectedRamen.comment = document.getElementById("edit-comment").value;

            handleClick(selectedRamen);
            editForm.reset();
        }
    });
}

// Handle deleting ramen
function addDeleteListener() {
    const deleteButton = document.getElementById("delete-ramen");
    deleteButton.addEventListener("click", function () {
        if (selectedRamen) {
            const index = ramens.findIndex(ramen => ramen.id === selectedRamen.id);
            if (index !== -1) {
                ramens.splice(index, 1);
                displayRamens();
            }
        }
    });
}

// Initialize the app
function main() {
    displayRamens();
    addSubmitListener();
    addEditListener();
    addDeleteListener();
}

document.addEventListener("DOMContentLoaded", main);
