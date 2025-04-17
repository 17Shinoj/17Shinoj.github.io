// Sample product data
const products = [
    {
        name: "Ancient Wisdom Purifying Bar",
        price: 14.99,
        description: "Natural black seed soap for deep cleansing",
        image: "images/product1.jpg"
    },
    // Add more products
];

// Function to render products
function displayProducts() {
    const productContainer = document.querySelector('#products .row');
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-4 mb-4">
                <div class="product-card">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayProducts);
