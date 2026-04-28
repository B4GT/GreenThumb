const searchForm = document.getElementById("searchForm");
const productForm = document.getElementById("productForm");
const searchResults = document.getElementById("searchResults");

const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("imageInput");
const priceInput = document.getElementById("price");
const keyWordsInput = document.getElementById("keyWords");
const categoryInput = document.getElementById("category");
const stockInput = document.getElementById("stock");
const imagePreview = document.getElementById("imagePreview");

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
});

productForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const description = descriptionInput.value;
    const images = imageInput.value;
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
        keywords: keywordsArray,
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

imageInput.addEventListener("input", () => { //Makes the images display whenever the URL is entered (I can try to implement an upload system later)
  const urls = imageInput.value
    .split(",")
    .map(url => url.trim())
    .filter(url => url !== "");

    imagePreview.innerHTML = "";

    urls.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "300px";
    img.style.margin = "10px";

    // makes sure that only working links work. this also keep it from trying to display a link that isn't fully typed out
    img.onerror = () => img.remove();

    imagePreview.appendChild(img);
  });
});