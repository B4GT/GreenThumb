/*
filename: script.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

/* =========================================
   PLANT DATASET
   An array of objects containing
   plants, their images, descriptions
   and corresponding product links
   ========================================= */
const plants = [
{
    name: "Snake Plant",
/*    image: "https://png.pngtree.com/png-clipart/20250108/original/pngtree-stylish-snake-plant-for-indoor-decor-png-image_18954841.png", */
    image: "snakeplant",
    description: "Great for air purification and extremely low maintenance.",
    link: "snakeplant-product.html"
},
{
    name: "Monstera",
/*    image: "https://png.pngtree.com/png-clipart/20240310/original/pngtree-monstera-deliciosa-monstera-giant-leaf-on-white-pot-air-purification-planthouse-png-image_14550252.png", */
    image: "monstera.png",
    description: "Known for its beautiful split leaves and tropical vibe.",
    link: "monstera-product.html"
},
{
    name: "Peace Lily",
/*    image: "https://static.vecteezy.com/system/resources/thumbnails/051/680/246/small/a-peace-lily-plant-in-a-white-pot-png.png", */
    image: "peacelily.png",
    description: "Excellent air purifier and thrives in low light.",
    link: "peacelily-product.html"
}
];

/* =========================================
   GLOBAL VARIABLES
   Tracks current state and links
   JavaScript to the HTML elements
   ========================================= */
const button = document.getElementById("generateBtn");
const image = document.getElementById("plantImage");
const name = document.getElementById("plantName");
const description = document.getElementById("plantDescription");
const productBtn = document.getElementById("productBtn");

/* Stores the plant currently being displayed */
let currentPlant = null;

/* Stores the index of the last plant shown. */
let lastIndex = -1;

/* =========================================
   PLANT GENERATOR LOGIC
   Handles the random selection and
   rendering of plant data
   ========================================= */
button.addEventListener("click", () => {

    /* Triggers the spin animation for the plant image */
    image.classList.add("spin");

    /* Delays the image swap to match animation timing */
    setTimeout(() => {

        let randomIndex;

	/* Ensures the same plant isn't picked twice in a row */
        do {
            randomIndex = Math.floor(Math.random() * plants.length);
        } while (randomIndex === lastIndex);

        lastIndex = randomIndex;
        currentPlant = plants[randomIndex];

	/* Update plant image source */
        image.src = currentPlant.image;

        /* Reset the name container */
        name.textContent = currentPlant.name;

        /* Update plant description text */
        description.textContent = currentPlant.description;

	/* End spin animation after content updates */
        image.classList.remove("spin");

    }, 800);
});

/* =========================================
   PRODUCT NAVIGATION
   Redirects the user to the specific
   shop page for the current plant
   ========================================= */
productBtn.addEventListener("click", () => {

    /* If a plant has been generated, navigate to its
       associated product page */
    if(currentPlant){
        window.location.href = currentPlant.link;
    }
});
