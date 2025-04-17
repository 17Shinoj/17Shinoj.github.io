// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Ancient Wisdom Purifying Bar",
            price: 14.99,
            description: "Natural black seed soap for deep cleansing",
            image: "images/product1.jpg"
        },
        {
            id: 2,
            name: "Golden Radiance Cleansing Bar",
            price: 19.99,
            description: "Saffron-infused beauty soap for glowing skin",
            image: "images/product2.jpg"
        },
        {
            id: 3,
            name: "Sunrise Glow Treatment Bar",
            price: 16.99,
            description: "Turmeric-enriched soap for natural brilliance",
            image: "images/product3.jpg"
        }
    ];

    // Function to display products
    function displayProducts() {
        const productGrid = document.querySelector('.product-grid');
        
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='images/placeholder.jpg'">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="buy-btn">
                        Add to Cart
                    </button>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    // Call the function to display products
    displayProducts();
});

// Simple cart functionality
let cart = [];

function addToCart(productId) {
    cart.push(productId);
    updateCartCount();
    alert('Product added to cart!');
}

function updateCartCount() {
    // We'll implement this later
    console.log(`Cart items: ${cart.length}`);
}
