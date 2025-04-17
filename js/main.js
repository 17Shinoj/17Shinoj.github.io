// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;
            
            // Show added to cart notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success';
            notification.textContent = 'Added to cart!';
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.zIndex = '1000';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
