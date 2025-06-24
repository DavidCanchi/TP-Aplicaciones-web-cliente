document.addEventListener('DOMContentLoaded', () => {
    const cartSummaryElement = document.getElementById('cart-summary');
    const totalPriceElement = document.getElementById('total-price');
    const completePurchaseButton = document.getElementById('complete-purchase-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartSummary() {
        cartSummaryElement.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartSummaryElement.innerHTML = '<p>No hay productos en el carrito.</p>';
            totalPriceElement.textContent = '$0';
            return;
        }

        cart.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('checkout-product-item');
            productDiv.innerHTML = `
                <p>${product.name} - $${product.price.toLocaleString('es-AR')}</p>
                <p>Cantidad: ${product.quantity}</p>
            `;
            cartSummaryElement.appendChild(productDiv);
            total += product.price * product.quantity;
        });

        totalPriceElement.textContent = `$${total.toLocaleString('es-AR')}`;
    }

    completePurchaseButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Compra realizada con éxito! Gracias por tu compra.');
            localStorage.removeItem('cart'); // Limpio el carrito después de la compra
            cart = [];
            displayCartSummary(); // Actualizo vista del carrito            
        } else {
            alert('Tu carrito está vacío. Agrega productos antes de confirmar la compra.');
        }
    });

    displayCartSummary();
});