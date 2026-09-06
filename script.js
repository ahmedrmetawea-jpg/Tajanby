// Products Data
const productsData = [
    // Storage Tools
    {
        id: 1,
        name: 'صندوق تخزين ذكي',
        category: 'storage',
        price: 149,
        emoji: '📦',
        description: 'صندوق تخزين ديكوري بتصميم حديث',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 2,
        name: 'رف معلق فاخر',
        category: 'storage',
        price: 199,
        emoji: '🏷️',
        description: 'رف خشبي بتصميم عصري',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 3,
        name: 'منظم أدراج',
        category: 'storage',
        price: 89,
        emoji: '🎁',
        description: 'منظم أدراج ديكوري مميز',
        rating: '⭐⭐⭐⭐'
    },
    
    // Decor
    {
        id: 4,
        name: 'إضاءة ديكورية LED',
        category: 'decor',
        price: 129,
        emoji: '💡',
        description: 'إضاءة LED ملونة قابلة للتحكم',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 5,
        name: 'لوحة ديكورية فنية',
        category: 'decor',
        price: 179,
        emoji: '🖼️',
        description: 'لوحة فنية حائطية بتصميم عصري',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 6,
        name: 'شموع معطرة فاخرة',
        category: 'decor',
        price: 99,
        emoji: '🕯️',
        description: 'شموع معطرة برائحة فاخرة',
        rating: '⭐⭐⭐⭐'
    },
    
    // Cleaning Tools
    {
        id: 7,
        name: 'مكنسة كهربائية ذكية',
        category: 'cleaning',
        price: 299,
        emoji: '🧹',
        description: 'مكنسة كهربائية بتقنية حديثة',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 8,
        name: 'مجموعة تنظيف متكاملة',
        category: 'cleaning',
        price: 149,
        emoji: '🧽',
        description: 'مجموعة أدوات تنظيف احترافية',
        rating: '⭐⭐⭐⭐'
    },
    {
        id: 9,
        name: 'سلة غسيل ديكورية',
        category: 'cleaning',
        price: 79,
        emoji: '🧺',
        description: 'سلة غسيل بتصميم ديكوري',
        rating: '⭐⭐⭐⭐'
    },
    
    // Bathroom
    {
        id: 10,
        name: 'مجموعة منشفات فاخرة',
        category: 'bathroom',
        price: 189,
        emoji: '🏥',
        description: 'مناشف حمام من أجود الخامات',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 11,
        name: 'مرآة ديكورية مضاءة',
        category: 'bathroom',
        price: 219,
        emoji: '🪞',
        description: 'مرآة بإضاءة LED مدمجة',
        rating: '⭐⭐⭐⭐⭐'
    },
    {
        id: 12,
        name: 'حامل الأدوات الحمام',
        category: 'bathroom',
        price: 119,
        emoji: '🪤',
        description: 'حامل معادن فاخر للحمام',
        rating: '⭐⭐⭐⭐'
    }
];

// Global Variables
let cart = [];
let currentCurrency = 'EGP';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all');
    loadCart();
});

// Display Products
function displayProducts(category) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    let filtered = productsData;
    if (category !== 'all') {
        filtered = productsData.filter(p => p.category === category);
    }
    
    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const price = formatPrice(product.price);
    
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-rating">${product.rating}</div>
            <div class="product-price">${price}</div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    أضف للسلة 🛒
                </button>
                <button class="btn-favorite" onclick="toggleFavorite(this)">
                    ❤️
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Format Price
function formatPrice(price) {
    if (currentCurrency === 'SAR') {
        return `${Math.round(price * 0.27)} ر.س`;
    }
    return `${price} ج.م`;
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        'storage': 'أدوات تخزين',
        'decor': 'ديكور',
        'cleaning': 'تنظيف',
        'bathroom': 'الحمام'
    };
    return names[category] || category;
}

// Filter Products
function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayProducts(category);
}

// Add to Cart
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    alert(`تم إضافة ${product.name} إلى السلة ✅`);
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    
    let totalPrice = 0;
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
        document.getElementById('cart-total').textContent = '0 ' + (currentCurrency === 'SAR' ? 'ر.س' : 'ج.م');
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.emoji} × ${item.quantity} = ${formatPrice(itemTotal)}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                حذف ❌
            </button>
        `;
        cartItems.appendChild(itemElement);
    });
    
    document.getElementById('cart-total').textContent = formatPrice(totalPrice);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Toggle Favorite
function toggleFavorite(button) {
    button.style.opacity = button.style.opacity === '0.5' ? '1' : '0.5';
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// Toggle Currency
function toggleCurrency() {
    currentCurrency = currentCurrency === 'EGP' ? 'SAR' : 'EGP';
    document.getElementById('currency').textContent = currentCurrency === 'SAR' ? 'ر.س' : 'ج.م';
    displayProducts('all');
    updateCartUI();
}