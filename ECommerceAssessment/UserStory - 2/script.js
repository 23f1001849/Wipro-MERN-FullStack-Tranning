const categoryFilter = document.querySelector('#categoryFilter');
const priceFilter = document.querySelector('#priceFilter');
const resetBtn = document.querySelector('#resetBtn');
const productGrid = document.querySelector('#productGrid');
const loadingMessage = document.querySelector('#loadingMessage');
const errorMessage = document.querySelector('#errorMessage');
const emptyMessage = document.querySelector('#emptyMessage');

const state = {
    products: [],
};

const toggleMessage = (element, show) => {
    element.classList.toggle('d-none', !show);
};

const formatPrice = (value) => `$${value.toFixed(2)}`;

const getPriceFilterBounds = (priceValue) => {
    if (priceValue === 'all') return null;
    if (priceValue.endsWith('+')) {
        return { min: Number(priceValue.replace('+', '')), max: Infinity };
    }
    const [min, max] = priceValue.split('-').map(Number);
    return { min, max };
};

const renderProducts = (products) => {
    productGrid.innerHTML = '';

    if (products.length === 0) {
        toggleMessage(emptyMessage, true);
        return;
    }

    toggleMessage(emptyMessage, false);

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-lg-4';

        col.innerHTML = `
            <article class="card h-100 product-card shadow-sm">
                <img class="product-thumb" src="${product.image}" alt="${product.title}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h3 class="h6 mb-0">${product.title}</h3>
                        <span class="badge badge-category">${product.category}</span>
                    </div>
                    <p class="small text-muted mb-3">${product.description}</p>
                    <p class="fw-semibold mb-0">${formatPrice(product.price)}</p>
                </div>
            </article>
        `;

        fragment.appendChild(col);
    });

    productGrid.appendChild(fragment);
};

const applyFilters = () => {
    const selectedCategory = categoryFilter.value;
    const priceBounds = getPriceFilterBounds(priceFilter.value);

    const filtered = state.products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' ? true : product.category === selectedCategory;
        const matchesPrice = priceBounds
            ? product.price >= priceBounds.min && product.price <= priceBounds.max
            : true;
        return matchesCategory && matchesPrice;
    });

    renderProducts(filtered);
};

const populateCategories = (products) => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    uniqueCategories.sort();
    uniqueCategories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
};

const loadProducts = async () => {
    toggleMessage(errorMessage, false);
    toggleMessage(emptyMessage, false);
    toggleMessage(loadingMessage, true);

    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const products = await response.json();
        state.products = products;

        populateCategories(products);
        applyFilters();
    } catch (error) {
        console.error('Failed to load products', error);
        toggleMessage(errorMessage, true);
        productGrid.innerHTML = '';
    } finally {
        toggleMessage(loadingMessage, false);
    }
};

categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);
resetBtn.addEventListener('click', () => {
    categoryFilter.value = 'all';
    priceFilter.value = 'all';
    applyFilters();
});

loadProducts();
