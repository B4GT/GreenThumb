let products = [];

fetch("../JSON/Products.json")
  .then(r => r.json())
  .then(d => {
    products = d.products;
  });

function searchProducts(products, query) {
  const terms = query.toLowerCase().trim().split(" ");
  return products.filter(product => {
    const searchableText = (product.name + " " + product.keywords.join(" ")).toLowerCase();
    return terms.every(term => searchableText.includes(term));
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  const results = searchProducts(products, query);
  console.log(results);
});