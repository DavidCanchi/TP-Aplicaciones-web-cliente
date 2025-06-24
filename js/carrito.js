// Variable para almacenar los productos en el carrito
let cart = [];

const cartCountElement = document.getElementById('cart-count');
const cartIconElement = document.getElementById('cart-icon');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Función para cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

// Función para agregar un producto al carrito
function addProductToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1 // Por ahora, estimo cantidad de 1
    };
    cart.push(product);
    saveCartToLocalStorage();
    updateCartCount();
    alert(`${productName} ha sido agregado al carrito.`);
}

// Event Listeners para los botones "Agregar al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.dataset.productName;
        const productPrice = parseFloat(event.target.dataset.productPrice);
        addProductToCart(productName, productPrice);
    });
});

// Event Listener para el ícono del carrito (ir a finalizar compra)
cartIconElement.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el enlace recargue la página
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos antes de finalizar la compra.');
    } else {
        // Redirijo a la página de finalizar compra
        window.location.href = '../pages/finalizar-compra.html';
    }
});

// Cargar el carrito cuando la página se carga
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);


// Función de validación del formulario de contacto 
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
 
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return false; 
    } 
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false; 
    } 
    document.getElementById('mensaje-exito').style.display = 'block';
    document.getElementById('formulario').reset(); 
    return false;
}

////////////////////////////////////////////////