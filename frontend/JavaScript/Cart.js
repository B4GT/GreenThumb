function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    const cart = getCart();

    const container = document.getElementById("cart-container");
    const totalElement = document.getElementById("total");

    if (!container || !totalElement) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty 🌱</p>";
        totalElement.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>

                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = total.toFixed(2);
}

function changeQuantity(index, amount) {
    let cart = getCart();

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

function removeItem(index) {
    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
}

window.onload = displayCart;
