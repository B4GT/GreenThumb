/*
filename: facts.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

/* =========================================
   ECO-FACTS DATASET
   An array of objects containing
   environmental stats and their
   corresponding sources
   ========================================= */
const ecoFacts = [
  {
    text: "As of 2021, The nation’s 5,426 data centers consume roughly 449 million gallons of water per day and 163.7 billion gallons annually.",
    url: "https://www.eesi.org/articles/view/data-centers-and-water-consumption"
  },
  {
    text: "An estimated 33 billion pounds of plastic enter the marine environmnet every year - that's roughly equivalent to dumping two garbage trucks full of plastic into the oceans every minute!",
    url: "https://usa.oceana.org/our-campaigns/plastic/"
  },
  {
    text: "Plastic waste can take anywhere from 20 to 500 years to decompose, and even then, it never fully disappears; it just gets smaller and smaller.",
    url: "https://www.un.org/en/exhibits/exhibit/in-images-plastic-forever"
  },
  {
    text: "A 10% increase in reusable beverage packaging by 2030 could eliminate over 1 trillion single-use plastic bottles and cups and prevent up to 153 billion of these containers from entering Earth's oceans and waterways.",
    url: "https://oceana.org/press-releases/report-switching-to-reusable-packaging-could-eliminate-1-trillion-single-use-plastic-bottles-and-cups/"
  },
  {
    text: "The United States alone uses nearly 50 million plastic water bottles each year.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  },
  {
    text: "Of the plastic water bottles purchased in the United States, only 23% are recycled.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  },
  {
    text: "It is estimated that a $20 reusable water bottle will save you $6,180 in five years.",
    url: "https://projectcleanwater.org/5-reasons-to-opt-for-reusable-water-bottles/"
  }
];

/* =========================================
   GLOBAL VARIABLES
   Tracks current state and links
   JavaScript to the HTML elements
   ========================================= */
let currentIndex = 0;
const factElement = document.getElementById("factText");
const sourceLink = document.getElementById("sourceLink");
const prevBtn = document.getElementById("prevFact");
const nextBtn = document.getElementById("nextFact");

/* =========================================
   DISPLAY LOGIC
   Handles the transition and content updates
   for the fact generator
   ========================================= */
function displayFact(index) {

    /* Triggers the CSS fade-out transition */
    factElement.classList.add("fade-out");

    /* Wait 500ms (duration of the fade) before changing text */
    setTimeout(() => {

	/* Loop logic: wrap around if index exceeds array bounds */
        if (index >= ecoFacts.length) currentIndex = 0;
        else if (index < 0) currentIndex = ecoFacts.length - 1;
        else currentIndex = index;

	/* Update content and link source */
        factElement.textContent = ecoFacts[currentIndex].text;
        sourceLink.href = ecoFacts[currentIndex].url;

	/* Fade the new text back in */
        factElement.classList.remove("fade-out");
    }, 500);
}

/* =========================================
   AUTO-SCROLL TIMER
   Automatically cycles through facts every
   7 seconds (7000 milliseconds)
   ========================================= */
let autoScroll = setInterval(() => {
    displayFact(currentIndex + 1);
}, 7000);


/* =========================================
   TIMER MANAGEMENT
   Resets the 7-second countdown when a
   user manually clicks a button to prevent
   the slide from changing too quickly
   ========================================= */
function resetTimer() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
        displayFact(currentIndex + 1);
    }, 7000);
}

/* =========================================
   EVENT LISTENERS
   Listens for user clicks on
   navigation buttons
   ========================================= */

/* Back Button Click */
prevBtn.addEventListener("click", () => {
    displayFact(currentIndex - 1);
    resetTimer();
});

/* Forward Button Click */
nextBtn.addEventListener("click", () => {
    displayFact(currentIndex + 1);
    resetTimer();
});

/* =========================================
   INITIALIZATION
   Displays the first fact immediately
   when the page loads
   ========================================= */
displayFact(0);
