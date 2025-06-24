document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productBrandInput = document.getElementById('product-brand');
    const productPriceInput = document.getElementById('product-price');
    const productImageInput = document.getElementById('product-image');
    const productDescriptionInput = document.getElementById('product-description');
    const saveProductBtn = document.getElementById('save-product-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const productsTableBody = document.querySelector('#products-table tbody');

    // Simulacio los datos en memoria y la carga desde localStorage
    let products = JSON.parse(localStorage.getItem('adminProducts')) || [
        { id: 1, name: 'Guitarra Electroacustica Taylor 114e', brand: 'Taylor', price: 1650000, image: '../img/taylor114.jpg', description: 'Una guitarra electroacústica de alta calidad con un sonido rico y equilibrado, ideal para músicos de todos los niveles.' },
        { id: 2, name: 'Bajo Fender Precision Bass', brand: 'Fender', price: 4650000, image: '../img/bajoFender.jpg', description: 'El clásico bajo Precision Bass de Fender, conocido por su potente tono y sustain. Perfecto para rock, blues y funk.' },
        { id: 3, name: 'Amplificador Bajo Hartke', brand: 'Hartke', price: 2650000, image: '../img/amplificadorHartke1.jpg', description: 'Amplificador potente y versátil para bajos, con una ecualización flexible y gran respuesta de bajos.' },
        { id: 4, name: 'Sintetizador Yamaha', brand: 'Yamaha', price: 1800000, image: '../img/sintetizadorYamaha.jpg', description: 'Un sintetizador Yamaha ideal para producción musical y actuaciones en vivo, con una amplia gama de sonidos.' },
        { id: 5, name: 'Batería Electrónica - Yamaha DD75', brand: 'Yamaha', price: 600000, image: '../img/bateriaYamaha.jpg', description: 'Batería electrónica compacta y con gran sonido, perfecta para practicar en casa o para presentaciones pequeñas.' }
    ];

    // Función para guardar los productos en localStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('adminProducts', JSON.stringify(products));
    }


    function getNextId() {
        if (products.length === 0) return 1;
        const maxId = Math.max(...products.map(p => p.id));
        return maxId + 1;
    }

    // Función para renderizar la tabla de productos
    function renderProductsTable() {
        productsTableBody.innerHTML = ''; 
        products.forEach(product => {
            const row = productsTableBody.insertRow();
            row.dataset.productId = product.id; // Almacenar el ID

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>$${product.price.toLocaleString('es-AR')}</td>
                <td class="actions-cell">
                    <button class="edit-btn" data-id="${product.id}">Editar</button>
                    <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // Función para limpiar el formulario de alta/edición
    function clearForm() {
        productIdInput.value = '';
        productNameInput.value = '';
        productBrandInput.value = '';
        productPriceInput.value = '';
        productImageInput.value = '';
        productDescriptionInput.value = '';
        saveProductBtn.textContent = 'Guardar Producto';
        cancelEditBtn.style.display = 'none'; 
    }

    // Función para cargar los datos de un producto en el formulario para su edición
    function loadProductForEdit(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            productIdInput.value = product.id;
            productNameInput.value = product.name;
            productBrandInput.value = product.brand;
            productPriceInput.value = product.price;
            productImageInput.value = product.image;
            productDescriptionInput.value = product.description;
            saveProductBtn.textContent = 'Actualizar Producto'; 
            cancelEditBtn.style.display = 'inline-block'; 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    }

    // Manejador del envío del formulario (Alta o Modificación)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de la página

        const id = productIdInput.value ? parseInt(productIdInput.value) : null;
        const name = productNameInput.value.trim();
        const brand = productBrandInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        const image = productImageInput.value.trim();
        const description = productDescriptionInput.value.trim();

        if (!name || !brand || isNaN(price) || price < 0 || !image || !description) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        if (id) {
            // Modificación de un producto existente
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                products[productIndex] = { id, name, brand, price, image, description };
            }
        } else {
            // Alta de un nuevo producto
            const newProduct = {
                id: getNextId(),
                name,
                brand,
                price,
                image,
                description
            };
            products.push(newProduct);
        }

        saveProductsToLocalStorage(); // Guardar cambios en localStorage
        renderProductsTable();      // Actualizar la tabla con los nuevos datos
        clearForm();               
    });


    cancelEditBtn.addEventListener('click', clearForm);

    // Delegación de eventos para los botones de la tabla (Editar y Eliminar)
    productsTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const idToEdit = parseInt(e.target.dataset.id);
            loadProductForEdit(idToEdit);
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
                const idToDelete = parseInt(e.target.dataset.id);
                products = products.filter(p => p.id !== idToDelete); // Filtrar para eliminar el producto
                saveProductsToLocalStorage(); // Guardar cambios
                renderProductsTable();      // Actualiza la tabla
                clearForm();                
            }
        }
    });
    renderProductsTable();
});