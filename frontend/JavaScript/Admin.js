const searchForm = document.getElementById("searchForm");
const productForm = document.getElementById("productForm");
const searchResults = document.getElementById("searchResults");

const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const imagesInput = document.getElementById("images");
const priceInput = document.getElementById("price");
const keyWordsInput = document.getElementById("keyWords");
const categoryInput = document.getElementById("category");
const stockInput = document.getElementById("stock");

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
});

productForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;
    const images = imagesInput.value;
    const price = Number(priceInput.value);
    const keyWords = keyWordsInput.value;
    const category = categoryInput.value;
    const stock = Number(stockInput.value);

    const imagesArray = images.split(",").map(img => img.trim()).filter(img => img !== "");
    const keywordsArray = keyWords.split(",").map(word => word.trim()).filter(word => word !== "");

    const productData = {
        name,
        description,
        price,
        category,
        stock,
        images: imagesArray
    };

    if (productIdInput.value !== "") {
        productData._id = productIdInput.value;
    }

    let url = "http://localhost:3000/api/admin/products/create-product"; //makes new product if the ID is blank
    let method = "POST";

    if (productIdInput.value !== "") { //edits existing product if ID exists
        url = "http://localhost:3000/api/admin/products/update-product";
        method = "PUT";
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(productData)
    });

    const data = await response.json();
    console.log(data);
});