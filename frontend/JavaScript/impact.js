/*
filename: impact.js
author: Evan Lanza
student id last four: 8804
cs username: elanza05
*/

/* =========================================
   IMPACT VARIABLES
   Maps specific product titles to their
   environmental metrics and unit values
   ========================================= */
const impactRules = {
    "Reusable Water Bottle": { key: "bottlesSaved", multiplier: 156 },
    "Cotton Tote Bag":       { key: "bagsSaved",    multiplier: 300 },
    "Succulents":            { key: "oxygenLiters", multiplier: 5   },
    "Steel Straw Set":       { key: "bottlesSaved", multiplier: 50  },
    "Flower Seeds":          { key: "oxygenLiters", multiplier: 2   }
};

/* =========================================
   PURCHASE TRANSACTION
   Calculates and records the sustainability
   impact of items in the cart immediately
   following a successful purchase
   ========================================= */
function processPurchaseImpact() {

    /* Pull active shopping cart array from local browser storage */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0) {
        cart.forEach(item => {
            const rule = impactRules[item.name];
            if (rule) {

		/* Multiply the eco-value by the item quantity purchased */
                let totalItemImpact = rule.multiplier * (item.quantity || 1);

                /* Get running historical totals or start fresh at 0 if first purchase */
                let permanentTotal = parseInt(localStorage.getItem(rule.key)) || 0;

                /* Save the new  metrics to storage */
                localStorage.setItem(rule.key, permanentTotal + totalItemImpact);
            }
        });

        /* Clear the current checkout cart after logging calculations */
        localStorage.removeItem("cart");
    }
}

/* =========================================
   DISPLAY MANAGER
   Retrieves environmental totals and
   safely renders them
   ========================================= */
function displayImpactDashboard() {
    const bottles = localStorage.getItem("bottlesSaved") || 0;
    const bags = localStorage.getItem("bagsSaved") || 0;
    const oxygen = localStorage.getItem("oxygenLiters") || 0;

    /* Conditionals prevent errors if elements aren't present on current page view */
    if (document.getElementById("bottles-stat")) {
        document.getElementById("bottles-stat").innerText = bottles;
    }
    if (document.getElementById("bags-stat")) {
        document.getElementById("bags-stat").innerText = bags;
    }
    if (document.getElementById("oxygen-stat")) {
        document.getElementById("oxygen-stat").innerText = oxygen;
    }
}

/* =========================================
   AUTOMATED INITIALIZATION
   Automatically triggers data fetching when
   detecting the About page layout context
   ========================================= */
if (window.location.pathname.includes("About.html")) {
    window.onload = displayImpactDashboard;
}
