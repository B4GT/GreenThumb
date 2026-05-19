const API_URL = "https://greenthumb-n49m.onrender.com";

async function fetchProductsFromBackend() {
    const res = await fetch(`${API_URL}/api/products/get-products`);

    if (!res.ok) {
        throw new Error("Failed to load products from backend");
    }

    const data = await res.json();

    let dbProducts = [];

    if (Array.isArray(data)) {
        dbProducts = data;
    } else if (data.products) {
        dbProducts = data.products;
    } else if (data.data) {
        dbProducts = data.data;
    }

    return dbProducts.map(product => ({
        id: product._id,
        name: product.name,
        images: product.images || [],
        short_description: product.description || product.short_description || "",
        description: product.description || product.short_description || "",
        price: product.price,
        rating: product.rating || 0,
        units_sold: product.unitsSold || product.units_sold || 0,
        unitsSold: product.unitsSold || product.units_sold || 0,
        keywords: product.keywords || [],
        category: product.category || "",
        stock: product.stock || 0
    }));
}