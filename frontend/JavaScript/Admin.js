const API_BASE = "http://localhost:3000";

const searchForm = document.getElementById("searchForm");
const productForm = document.getElementById("productForm");
const searchResults = document.getElementById("searchResults");
const productSelect = document.getElementById("productSelect");
const statusMessage = document.getElementById("statusMessage");

const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("imageInput");
const priceInput = document.getElementById("price");
const keyWordsInput = document.getElementById("keyWords");
const categoryInput = document.getElementById("category");
const stockInput = document.getElementById("stock");
const imagePreview = document.getElementById("imagePreview");
const clearFormButton = document.getElementById("clearFormButton");
const displayProductIdInput = document.getElementById("displayProductId");
const ratingInput = document.getElementById("rating");
const unitsSoldInput = document.getElementById("unitsSold");

let currentSearchProducts = [];

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const query = document.getElementById("query").value.trim();

    const response = await fetch(`${API_BASE}/api/admin/products/search-products?query=${encodeURIComponent(query)}`, {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();
    console.log(data);

    productSelect.innerHTML = "";

    if (!response.ok || !data.success) {
        productSelect.innerHTML = `<option value="">Error searching products</option>`;
        return;
    }

    currentSearchProducts = data.products;

    if (currentSearchProducts.length === 0) {
        productSelect.innerHTML = `<option value="">No products found</option>`;
        return;
    }

    productSelect.innerHTML = `<option value="">Select a product</option>`;

    currentSearchProducts.forEach(product => {
        const option = document.createElement("option");
        option.value = product._id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
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

    let url = `${API_BASE}/api/admin/products/create-product`; //makes new product if the ID is blank
    let method = "POST";

    if (productIdInput.value !== "") { //edits existing product if ID exists
        url = `${API_BASE}/api/admin/products/update-product`;
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

    if (!response.ok || !data.success) {
        statusMessage.textContent = data.message || "Could not save product.";
        return;
    }

    if (productIdInput.value !== "") {
        statusMessage.textContent = "Product updated successfully.";
    } else {
        statusMessage.textContent = "Product created successfully.";
    }
});

productSelect.addEventListener("change", function () {
    const selectedProductId = productSelect.value;

    if (selectedProductId === "") {
        return;
    }

    const selectedProduct = currentSearchProducts.find(product => product._id === selectedProductId);

    if (!selectedProduct) {
        return;
    }

    productIdInput.value = selectedProduct._id || "";
    nameInput.value = selectedProduct.name || "";
    descriptionInput.value = selectedProduct.description || "";
    imageInput.value = selectedProduct.images ? selectedProduct.images.join(", ") : "";
    priceInput.value = selectedProduct.price || "";
    keyWordsInput.value = selectedProduct.keywords ? selectedProduct.keywords.join(", ") : "";
    categoryInput.value = selectedProduct.category || "";
    stockInput.value = selectedProduct.stock || 0;
    displayProductIdInput.value = selectedProduct._id || "";
    ratingInput.value = selectedProduct.rating || 0;
    unitsSoldInput.value = selectedProduct.unitsSold || 0;

    imageInput.dispatchEvent(new Event("input"));

    statusMessage.textContent = "Product loaded. Saving will update this existing product.";
});


clearFormButton.addEventListener("click", function () {
    clearProductForm();
});

function clearProductForm() {
    productIdInput.value = "";
    nameInput.value = "";
    descriptionInput.value = "";
    imageInput.value = "";
    priceInput.value = "";
    keyWordsInput.value = "";
    categoryInput.value = "";
    stockInput.value = 0;
    imagePreview.innerHTML = "";
    productSelect.value = "";
    displayProductIdInput.value = "";
    ratingInput.value = "";
    unitsSoldInput.value = "";

    statusMessage.textContent = "Form cleared. Saving will create a new product.";
}

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

async function checkLoginAccess() {
    try {
        const response = await fetch(`${API_BASE}/api/auth/check`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            document.body.innerHTML = "<h2>Access Denied. Please login first.</h2>";
            return;
        }

        console.log("Login confirmed");
    } catch (error) {
        console.error(error);
        document.body.innerHTML = "<h2>Error when checking login status.</h2>";
    }
}



checkLoginAccess();