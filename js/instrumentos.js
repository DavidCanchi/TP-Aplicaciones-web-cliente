document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('lista-productos');
    const ordenarSelect = document.getElementById('ordenar');
    const filtrarMarcaSelect = document.getElementById('filtrarMarca');
    const modal = document.getElementById('product-modal');
    const closeButton = document.querySelector('.close-button');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');

    // Obtener todos los productos
    const allProducts = Array.from(productosContainer.querySelectorAll('.producto')).map(productElement => {
        const priceText = productElement.querySelector('p').textContent; 
        const priceValue = parseFloat(priceText.replace(/\./g, '').replace('$', '')); 

        return {
            element: productElement,
            name: productElement.querySelector('h3').textContent,
            price: priceValue,
            brand: productElement.dataset.productBrand,
            description: productElement.dataset.productDescription,
            image: productElement.querySelector('img').src,
            originalPriceText: priceText
        };
    });

    function populateBrandFilter() {
        const brands = new Set();
        allProducts.forEach(product => {
            if (product.brand) {
                brands.add(product.brand);
            }
        });
       
        filtrarMarcaSelect.innerHTML = '<option value="todos">Todas las Marcas</option>';
        Array.from(brands).sort().forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            filtrarMarcaSelect.appendChild(option);
        });
    }

    // Función filtros y ordenamiento
    function applyFiltersAndSort() {
        let productsToShow = [...allProducts]; 

        const selectedOrder = ordenarSelect.value;
        const selectedBrand = filtrarMarcaSelect.value;

        // Filtro por marca
        if (selectedBrand !== 'todos') {
            productsToShow = productsToShow.filter(product => product.brand === selectedBrand);
        }

        // 2. Ordenar
        if (selectedOrder === 'precioAsc') {
            productsToShow.sort((a, b) => a.price - b.price);
        } else if (selectedOrder === 'precioDesc') {
            productsToShow.sort((a, b) => b.price - a.price);
        }

        // Limpiar el contenedor antes de añadir los productos ordenados o filtrados
        productosContainer.innerHTML = '';

        // Añadir los productos al DOM en el nuevo orden
        productsToShow.forEach(product => {
            productosContainer.appendChild(product.element);
        });
    }

    // Event Listeners para los selectores
    ordenarSelect.addEventListener('change', applyFiltersAndSort);
    filtrarMarcaSelect.addEventListener('change', applyFiltersAndSort);

    // Inicializar el filtro de marcas y aplicar filtros/ordenamiento inicial
    populateBrandFilter();
    applyFiltersAndSort(); 


    // Abrir modal
    productosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-ver-detalle')) {
            const productElement = event.target.closest('.producto');
            if (productElement) {
                const productName = productElement.querySelector('h3').textContent;
                const productPrice = productElement.querySelector('p').textContent; 
                const productDescription = productElement.dataset.productDescription;
                const productImage = productElement.querySelector('img').src;

                modalImg.src = productImage;
                modalImg.alt = productName; 
                modalTitle.textContent = productName;
                modalPrice.textContent = productPrice;
                modalDescription.textContent = productDescription;

                // Actualiza los data-attributes del botón de agregar al carrito del modal
                modalAddToCartBtn.dataset.productName = productName;
                modalAddToCartBtn.dataset.productPrice = productElement.dataset.productPrice; 

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
            }
        }
    });

    // Cerrar el modal al hacer clic en la 'x'
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
  
});