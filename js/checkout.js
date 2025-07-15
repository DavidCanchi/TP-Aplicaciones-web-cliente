document.addEventListener('DOMContentLoaded', () => {
    const cartSummaryElement = document.getElementById('cart-summary');
    const totalPriceElement = document.getElementById('total-price');
    const completePurchaseButton = document.getElementById('complete-purchase-btn');

    // Carga el carrito del localStorage, si no existe, inicializa como un arreglo vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para guardar el carrito en localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // NUEVA FUNCIÓN: Eliminar un producto del carrito por su índice
    function removeItemFromCart(index) {
        // Elimina 1 elemento desde la posición 'index'
        cart.splice(index, 1); 
        saveCartToLocalStorage(); // Guarda el carrito actualizado
        displayCartSummary(); // Vuelve a renderizar el resumen del carrito para reflejar el cambio
    }

/*    function displayCartSummary() {
        cartSummaryElement.innerHTML = ''; // Limpia el contenido actual
        let total = 0;

        if (cart.length === 0) {
            cartSummaryElement.innerHTML = '<p>No hay productos en el carrito.</p>';
            totalPriceElement.textContent = '$0';
            completePurchaseButton.disabled = true; // Deshabilita el botón si el carrito está vacío
            return;
        }

        completePurchaseButton.disabled = false; // Habilita el botón si hay productos

        cart.forEach((product, index) => { 
            const productDiv = document.createElement('div');
            productDiv.classList.add('checkout-product-item');

            productDiv.innerHTML = `
                <p>${product.name} - $${product.price.toLocaleString('es-AR')}</p>
                <p>Cantidad: ${product.quantity}</p>
                <button class="remove-item-btn" data-index="${index}">Eliminar</button> 
            `; 
            cartSummaryElement.appendChild(productDiv);
            total += product.price * product.quantity;
        });

        totalPriceElement.textContent = `$${total.toLocaleString('es-AR')}`;

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const indexToRemove = parseInt(event.target.dataset.index); //obtencion de indice
                removeItemFromCart(indexToRemove); // llamo a la función de eliminar
            });
        });
    }*/
   function displayCartSummary() {
    cartSummaryElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartSummaryElement.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalPriceElement.textContent = '$0';
        completePurchaseButton.disabled = true;
        return;
    }

    completePurchaseButton.disabled = false;

    cart.forEach((product, index) => {
        const subtotal = product.price * product.quantity;
        const productDiv = document.createElement('div');
        productDiv.classList.add('checkout-product-item');

        productDiv.innerHTML = `
            <p>${product.name} - $${product.price.toLocaleString('es-AR')}</p>
            <div class="quantity-control">
                <button class="decrease-qty" data-index="${index}">-</button>
                <span>Cantidad: ${product.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
            </div>
            <p>Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
            <button class="remove-item-btn" data-index="${index}">Eliminar</button>
        `;

        cartSummaryElement.appendChild(productDiv);
        total += subtotal;
    });

    totalPriceElement.textContent = `$${total.toLocaleString('es-AR')}`;

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            removeItemFromCart(index);
        });
    });

    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            cart[index].quantity++;
            saveCartToLocalStorage();
            displayCartSummary();
        });
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                removeItemFromCart(index);
                return;
            }
            saveCartToLocalStorage();
            displayCartSummary();
        });
    });
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

    displayCartSummary(); // Muestra el resumen del carrito al cargar la página
});