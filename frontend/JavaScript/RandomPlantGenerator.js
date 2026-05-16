/*
filename: RandomPlantGenerator.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

/* =========================================
   SUCCULENT DATASET
   An array of objects containing
   succulents, their images, descriptions
   and corresponding shop links
   ========================================= */
const plants = [
{
    name: "Burro's Tail (Sedum morganianum)",
    image: "../IMGS/Succulents/BurrosTail.webp",
    description: "A trailing succulent known for its long, tail-like stems and easy propagation.",
    link: "#"
},
{
    name: "Crown of Thorns (Euphorbia milii)",
    image: "../IMGS/Succulents/CrownOfThorns.webp",
    description: "A hardy, low-maintenance plant that tolerates dryness and blooms with proper sunlight.",
    link: "#"
},
{
    name: "Flaming Katy (Kalanchoe blossfeldiana)",
    image: "../IMGS/Succulents/FlamingKaty.jpg",
    description: "A colorful flowering succulent that thrives indoors with bright light and warmth.",
    link: "#"
},
{
    name: "Jade Plant (Crassula ovata)",
    image: "../IMGS/Succulents/JadePlant.avif",
    description: "A tree-like succulent prized for its thick leaves and bonsai-style appearance.",
    link: "#"
},
{
    name: "Aloe Vera (Aloe vera)",
    image: "../IMGS/Succulents/AloeVera.jpg",
    description: "A popular medicinal plant valued for its soothing gel used on burns and skin.",
    link: "#"
},
{
    name: "Panda Plant (Kalanchoe tomentosa)",
    image: "../IMGS/Succulents/PandaPlant.webp",
    description: "A small, fuzzy-leaved succulent admired for its soft texture and unique look.",
    link: "#"
},
{
    name: "Pincushion Cactus (Mammillaria crinita)",
    image: "../IMGS/Succulents/PincushionCactus.jpg",
    description: "A compact, spiky cactus known for its round shape and bright blooms.",
    link: "#"
},
{
    name: "Roseum (Sedum spurium)",
    image: "../IMGS/Succulents/Roseum.jpg",
    description: "A fast-growing, low plant that adds color with pink star-shaped flowers.",
    link: "#"
},
{
    name: "Snake Plant (Sansevieria trifasciata)",
    image: "../IMGS/Succulents/SnakePlant.webp",
    description: "An extremely hardy plant known for surviving low light and improving air quality.",
    link: "#"
},
{
    name: "Zebra Plant (Haworthia fasciata)",
    image: "../IMGS/Succulents/ZebraPlant.jpg",
    description: "A compact, low-care succulent recognized for its striped, decorative leaves.",
    link: "#"
},
{
    name: "Hens-and-Chicks (Sempervivum tectorum)",
    image: "../IMGS/Succulents/HensAndChicks.webp",
    description: "A resilient, easy-to-grow succulent perfect for people without a natural knack for gardening.",
    link: "#"
},
{
    name: "Stonecrop (Sedum spp.)",
    image: "../IMGS/Succulents/Stonecrop.webp",
    description: "A versatile succulent group known for colorful foliage and garden-friendly growth habits.",
    link: "#"
},
{
    name: "Whale’s Tongue Agave (Agave ovatifolia)",
    image: "../IMGS/Succulents/WhaleTongueAgave.jpg",
    description: "A large, striking plant with wide leaves suited for spacious outdoor settings.",
    link: "#"
},
{
    name: "Ball Cactus (Parodia magnifica)",
    image: "../IMGS/Succulents/BallCactus.jpg",
    description: "A round, balloon-shaped cactus admired for its form and yellow flowers.",
    link: "#"
},
{
    name: "Plush Plant (Echeveria pulvinata)",
    image: "../IMGS/Succulents/PlushPlant.jpg",
    description: "A soft, hairy succulent with a silvery glow and warm-colored blooms.",
    link: "#"
},
{
    name: "Dudleya (Echeveria spp.)",
    image: "../IMGS/Succulents/Dudleya.jpg",
    description: "A long-living rosette succulent valued for its symmetry and drought tolerance.",
    link: "#"
},
{
    name: "Pig’s Ear (Cotyledon orbiculata)",
    image: "../IMGS/Succulents/PigsEar.jpg",
    description: "A large succulent with thick, red-edged leaves and drooping seasonal flowers.",
    link: "#"
},
{
    name: "Zwartkop (Aeonium arboreum)",
    image: "../IMGS/Succulents/Zwartkop.webp",
    description: "A dramatic “black rose” succulent known for its dark foliage and bright yellow blooms.",
    link: "#"
},
{
    name: "Sunburst (Aeonium davidbramwellii)",
    image: "../IMGS/Succulents/Sunburst.webp",
    description: "A tri-colored rosette succulent prized for its vibrant, variegated leaves.",
    link: "#"
},
{
    name: "Torch Plant (Aloe aristata)",
    image: "../IMGS/Succulents/TorchPlant.jpg",
    description: "A tall-growing succulent that produces bright, torch-like orange flowers.",
    link: "#"
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

/* Stores the index of the last plant shown */
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

	/* Set the new generated image class as "generated" */
	/* Used for styling purposes */
	image.classList.add("generated");

	/* Reset the name container for new content */
        name.textContent = "";

	/* =========================================
           NAME PARSING
           Separates common names from Latin names
           found in parentheses for custom styling
           ========================================= */

	/* Code was generated using ChatGPT.
	   Prompt: "How can I parse a string in JavaScript so that I can
		    italicize words inside parentheses but keep the string
		    together?" */
        // START
        const parts = currentPlant.name.split("(");
        const commonName = parts[0].trim();
        const latinName = parts[1] ? parts[1].replace(")", "").trim() : "";

	/* Create text node for the common name */
        const commonText = document.createTextNode(commonName + " ");

	/* Create stylized span for the Latin name */
        const latinSpan = document.createElement("span");
        latinSpan.classList.add("latin");
        latinSpan.textContent = latinName ? `(${latinName})` : "";

        name.appendChild(commonText);
        if (latinName) {
            name.appendChild(latinSpan);
        }
	// STOP

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
    if (currentPlant) {
        window.location.href = currentPlant.link;
    }
});
