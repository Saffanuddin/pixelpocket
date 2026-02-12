// ===================================
// PIXELPOCKET - MAIN APPLICATION LOGIC
// ===================================

// State Management
const state = {
    cart: [],
    orders: [],
    reviews: [],
    designs: [],
    currentFilter: 'all',
    slotsRemaining: 7,
    totalSlots: 15
};

// Sample Design Data
const designsData = [
    { id: 1, name: 'Naruto Pixel', category: 'anime', price: 100, image: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' },
    { id: 2, name: 'Luffy Chibi', category: 'anime', price: 100, image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, name: 'Kawaii Cat', category: 'cute', price: 100, image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, name: 'Bunny Love', category: 'cute', price: 100, image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 5, name: 'Mario Pixel', category: 'gaming', price: 100, image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 6, name: 'Minecraft Steve', category: 'gaming', price: 100, image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { id: 7, name: 'Heart Duo', category: 'couple', price: 100, image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 8, name: 'Love Birds', category: 'couple', price: 100, image: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { id: 9, name: 'Your Name Art', category: 'name', price: 150, image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: 10, name: 'Custom Name', category: 'name', price: 150, image: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)' },
    { id: 11, name: 'Fully Custom 1', category: 'custom', price: 200, image: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 12, name: 'Fully Custom 2', category: 'custom', price: 200, image: 'linear-gradient(135deg, #f8b500 0%, #fceabb 100%)' }
];

// Sample Reviews Data
const reviewsData = [
    { name: 'Priya Sharma', rating: 5, text: 'Amazing quality! The pixel art is so detailed and looks exactly like my reference. Delivery was super fast too. Highly recommend! 💯', date: '2024-01-15' },
    { name: 'Arjun Patel', rating: 5, text: 'Got a custom anime design for my girlfriend. She absolutely loved it! The team was very responsive and made changes as per my request. Worth every rupee!', date: '2024-01-12' },
    { name: 'Sneha Reddy', rating: 4, text: 'Really cool concept and the final product looks great on my phone. Took about 6 days to arrive. Would order again!', date: '2024-01-10' },
    { name: 'Rahul Verma', rating: 5, text: 'Best decision ever! My phone looks unique now. Everyone in college asks me where I got it from. Thank you PixelPocket! 🔥', date: '2024-01-08' },
    { name: 'Ananya Singh', rating: 5, text: 'Perfect quality and the handmade touch really shows. Love supporting student startups like this! Keep up the great work!', date: '2024-01-05' },
    { name: 'Karan Mehta', rating: 4, text: 'Great service and communication throughout. The pixel art of my pet dog came out beautifully. Minor delay but worth the wait!', date: '2024-01-03' }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
    
    // Load data
    state.designs = designsData;
    state.reviews = reviewsData;
    
    // Initialize components
    initializeNavigation();
    initializeHero();
    loadDesigns();
    loadReviews();
    initializeDemoSection();
    initializeOrderForm();
    initializeStarRating();
    updateSlotsCounter();
    startWeeklyTimer();
    
    // Event Listeners
    setupEventListeners();
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Hero Section
function initializeHero() {
    const pixelArtDemo = document.getElementById('pixel-art-demo');
    
    // Create animated pixel art pattern
    for (let i = 0; i < 256; i++) {
        const pixel = document.createElement('div');
        pixel.style.background = Math.random() > 0.7 ? 'rgba(255,255,255,0.3)' : 'transparent';
        pixel.style.borderRadius = '2px';
        pixel.style.animation = `pixelFlicker ${Math.random() * 3 + 2}s infinite`;
        pixel.style.animationDelay = `${Math.random() * 2}s`;
        pixelArtDemo.appendChild(pixel);
    }
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pixelFlicker {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Design Gallery
function loadDesigns(filter = 'all') {
    const grid = document.getElementById('design-grid');
    grid.innerHTML = '';
    
    const filteredDesigns = filter === 'all' 
        ? state.designs 
        : state.designs.filter(d => d.category === filter);
    
    filteredDesigns.forEach(design => {
        const card = createDesignCard(design);
        grid.appendChild(card);
    });
}

function createDesignCard(design) {
    const card = document.createElement('div');
    card.className = 'design-card';
    card.innerHTML = `
        <div class="design-image" style="background: ${design.image}">
            <div style="width: 100%; height: 100%; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="10" height="10" fill="rgba(255,255,255,0.1)"/><rect x="10" width="10" height="10" fill="rgba(0,0,0,0.05)"/></svg>'); background-size: 20px 20px;"></div>
        </div>
        <div class="design-info">
            <h3 class="design-name">${design.name}</h3>
            <p class="design-category">${capitalizeFirst(design.category)}</p>
            <div class="design-footer">
                <span class="design-price">₹${design.price}</span>
                <button class="design-btn" onclick="addToCart(${design.id})">Select</button>
            </div>
        </div>
    `;
    return card;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter System
document.addEventListener('DOMContentLoaded', () => {
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            loadDesigns(category);
        });
    });
});

// Cart Management
function addToCart(designId) {
    const design = state.designs.find(d => d.id === designId);
    if (design) {
        state.cart.push(design);
        updateCartCount();
        showNotification('Added to cart! ✨');
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = state.cart.length;
    
    // Animate cart button
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Demo Section
function initializeDemoSection() {
    const colorOptions = document.querySelectorAll('.color-option');
    const demoPhone = document.getElementById('demo-phone');
    const demoInsert = document.getElementById('demo-insert');
    const designSelect = document.getElementById('demo-design-select');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            const color = option.dataset.color;
            updatePhoneColor(demoPhone, color);
        });
    });
    
    designSelect.addEventListener('change', (e) => {
        updateDesignPreview(demoInsert, e.target.value);
    });
}

function updatePhoneColor(phone, color) {
    const colors = {
        midnight: '#1d1d1f',
        starlight: '#f5f5f0',
        blue: '#276fbf',
        purple: '#9f7aea',
        red: '#e74c3c'
    };
    phone.style.background = colors[color] || colors.midnight;
}

function updateDesignPreview(insert, design) {
    const designs = {
        anime: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cute: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        gaming: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        nature: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        abstract: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    insert.style.background = designs[design] || designs.anime;
}

// Custom Order Form
function initializeOrderForm() {
    const form = document.getElementById('custom-order-form');
    const designTypeInputs = document.querySelectorAll('input[name="designType"]');
    const fileInput = document.getElementById('reference-image');
    const filePreview = document.getElementById('file-preview');
    
    // Design type selection
    designTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            const price = parseInt(input.dataset.price);
            updateOrderPrice(price);
        });
    });
    
    // File upload
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleOrderSubmission(form);
    });
}

function updateOrderPrice(basePrice) {
    document.getElementById('summary-price').textContent = `₹${basePrice}`;
    document.getElementById('summary-total').textContent = `₹${basePrice}`;
}

function handleOrderSubmission(form) {
    const formData = new FormData(form);
    const orderData = {
        id: generateOrderId(),
        name: formData.get('name'),
        phoneModel: formData.get('phoneModel'),
        designType: formData.get('designType'),
        customText: formData.get('customText'),
        whatsapp: formData.get('whatsapp'),
        location: formData.get('location'),
        paymentMethod: formData.get('paymentMethod'),
        price: document.getElementById('summary-total').textContent,
        status: 'pending',
        date: new Date().toISOString(),
        estimatedDelivery: getEstimatedDelivery()
    };
    
    // Save order
    state.orders.push(orderData);
    saveToLocalStorage('orders', state.orders);
    
    // Update slots
    state.slotsRemaining--;
    updateSlotsCounter();
    
    // Show success animation
    showSuccessAnimation(orderData);
    
    // Send WhatsApp notification (simulated)
    setTimeout(() => {
        window.open(`https://wa.me/${orderData.whatsapp.replace(/\D/g, '')}?text=Hi! Your PixelPocket order ${orderData.id} has been confirmed! We'll send you design previews within 2-3 days. Track your order at pixelpocket.com/track`, '_blank');
    }, 2000);
    
    // Reset form
    form.reset();
}

function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000);
    return `PXL${year}${month}${day}${random}`;
}

function getEstimatedDelivery() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function showSuccessAnimation(orderData) {
    const container = document.getElementById('success-animation');
    container.innerHTML = `
        <div class="success-content">
            <div class="success-icon">🎉</div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">Order Placed Successfully!</h2>
            <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 1rem;">Order ID: <strong>${orderData.id}</strong></p>
            <p style="color: #6b7280;">We'll send you a WhatsApp confirmation shortly.</p>
            <button class="btn btn-primary" onclick="closeSuccessAnimation()" style="margin-top: 2rem;">Continue Shopping</button>
        </div>
    `;
    container.classList.add('show');
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeSuccessAnimation();
    }, 5000);
}

function closeSuccessAnimation() {
    document.getElementById('success-animation').classList.remove('show');
}

// Order Tracking
function trackOrder() {
    const orderId = document.getElementById('order-id-input').value.trim();
    const resultContainer = document.getElementById('tracking-result');
    
    if (!orderId) {
        showNotification('Please enter an order ID', 'error');
        return;
    }
    
    // Load orders from localStorage
    const orders = loadFromLocalStorage('orders') || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        resultContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #ef4444; margin-bottom: 0.5rem;">Order Not Found</h3>
                <p style="color: #6b7280;">Please check your order ID and try again.</p>
            </div>
        `;
        resultContainer.classList.add('show');
        return;
    }
    
    // Display order status
    displayOrderStatus(order, resultContainer);
}

function displayOrderStatus(order, container) {
    const statuses = [
        { name: 'Order Placed', status: 'completed', icon: '✓' },
        { name: 'Design in Progress', status: order.status === 'pending' ? 'active' : 'completed', icon: '🎨' },
        { name: 'Ready for Delivery', status: order.status === 'ready' ? 'active' : order.status === 'delivered' ? 'completed' : '', icon: '📦' },
        { name: 'Delivered', status: order.status === 'delivered' ? 'completed' : '', icon: '✓' }
    ];
    
    container.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;">Order #${order.id}</h3>
        <div class="status-timeline">
            ${statuses.map(s => `
                <div class="status-step ${s.status}">
                    <div class="status-icon">${s.icon}</div>
                    <div class="status-content">
                        <h4>${s.name}</h4>
                        <p>${s.status === 'active' ? 'In Progress' : s.status === 'completed' ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 2rem; padding: 1.5rem; background: #f3f4f6; border-radius: 0.75rem;">
            <p><strong>Phone Model:</strong> ${order.phoneModel}</p>
            <p><strong>Design Type:</strong> ${capitalizeFirst(order.designType)}</p>
            <p><strong>Total Amount:</strong> ${order.price}</p>
            <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
        </div>
    `;
    container.classList.add('show');
}

// Reviews
function loadReviews() {
    const carousel = document.getElementById('reviews-carousel');
    carousel.innerHTML = state.reviews.slice(0, 6).map(review => createReviewCard(review)).join('');
}

function createReviewCard(review) {
    const initial = review.name.charAt(0);
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${initial}</div>
                <div class="review-author">
                    <h4>${review.name}</h4>
                    <div class="review-stars">${stars}</div>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `;
}

function initializeStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating-input');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            ratingInput.value = rating;
            
            stars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(reviewForm);
        
        const newReview = {
            name: formData.get('reviewName'),
            rating: parseInt(formData.get('rating')),
            text: formData.get('reviewText'),
            date: new Date().toISOString()
        };
        
        state.reviews.unshift(newReview);
        saveToLocalStorage('reviews', state.reviews);
        loadReviews();
        reviewForm.reset();
        stars.forEach(s => s.classList.remove('active'));
        showNotification('Thank you for your review! 🌟');
    });
}

// Slots Counter
function updateSlotsCounter() {
    document.getElementById('slots-remaining').textContent = `${state.slotsRemaining}/${state.totalSlots}`;
}

function startWeeklyTimer() {
    function updateTimer() {
        const now = new Date();
        const nextMonday = new Date();
        nextMonday.setDate(now.getDate() + (8 - now.getDay()) % 7);
        nextMonday.setHours(0, 0, 0, 0);
        
        const diff = nextMonday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('weekly-timer').textContent = `Resets in: ${days}d ${hours}h`;
    }
    
    updateTimer();
    setInterval(updateTimer, 60000);
}

// Admin Functions
function openAdminLogin() {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2 style="margin-bottom: 1.5rem;">Admin Login</h2>
            <form onsubmit="handleAdminLogin(event)">
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="admin-password" placeholder="Enter admin password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Login</button>
            </form>
        </div>
    `;
    modal.classList.add('show');
}

function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    // Simple password check (in production, use proper authentication)
    if (password === 'pixelpocket2024') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        showNotification('Incorrect password', 'error');
    }
}

function openAdminDashboard() {
    const modal = document.getElementById('modal');
    const orders = loadFromLocalStorage('orders') || [];
    
    const weeklyRevenue = orders.reduce((sum, order) => {
        const price = parseInt(order.price.replace(/[^0-9]/g, ''));
        return sum + price;
    }, 0);
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px;">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2 style="margin-bottom: 2rem;">Admin Dashboard</h2>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 0.75rem; color: white;">
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">${orders.length}</h3>
                    <p>Total Orders</p>
                </div>
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 1.5rem; border-radius: 0.75rem; color: white;">
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">₹${weeklyRevenue}</h3>
                    <p>Weekly Revenue</p>
                </div>
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 1.5rem; border-radius: 0.75rem; color: white;">
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">${state.slotsRemaining}</h3>
                    <p>Slots Remaining</p>
                </div>
            </div>
            
            <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
                <button class="btn btn-primary" onclick="downloadOrdersCSV()">Download CSV</button>
                <button class="btn btn-secondary" onclick="clearCompletedOrders()">Clear Completed</button>
            </div>
            
            <div style="max-height: 400px; overflow-y: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f3f4f6; text-align: left;">
                            <th style="padding: 0.75rem;">Order ID</th>
                            <th style="padding: 0.75rem;">Customer</th>
                            <th style="padding: 0.75rem;">Phone</th>
                            <th style="padding: 0.75rem;">Status</th>
                            <th style="padding: 0.75rem;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 0.75rem;">${order.id}</td>
                                <td style="padding: 0.75rem;">${order.name}</td>
                                <td style="padding: 0.75rem;">${order.phoneModel}</td>
                                <td style="padding: 0.75rem;">
                                    <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 0.5rem; border-radius: 0.375rem;">
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                        <option value="in-progress" ${order.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                        <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                    </select>
                                </td>
                                <td style="padding: 0.75rem;">
                                    <button onclick="viewOrderDetails('${order.id}')" style="padding: 0.5rem; background: #6366f1; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">View</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    modal.classList.add('show');
}

function updateOrderStatus(orderId, newStatus) {
    const orders = loadFromLocalStorage('orders') || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveToLocalStorage('orders', orders);
        showNotification('Order status updated');
    }
}

function viewOrderDetails(orderId) {
    const orders = loadFromLocalStorage('orders') || [];
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        const modal = document.getElementById('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="openAdminDashboard()">&times;</button>
                <h2 style="margin-bottom: 1.5rem;">Order Details</h2>
                <div style="display: grid; gap: 1rem;">
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Customer Name:</strong> ${order.name}</p>
                    <p><strong>Phone Model:</strong> ${order.phoneModel}</p>
                    <p><strong>Design Type:</strong> ${capitalizeFirst(order.designType)}</p>
                    <p><strong>Custom Text:</strong> ${order.customText || 'N/A'}</p>
                    <p><strong>WhatsApp:</strong> ${order.whatsapp}</p>
                    <p><strong>Location:</strong> ${order.location}</p>
                    <p><strong>Payment:</strong> ${capitalizeFirst(order.paymentMethod)}</p>
                    <p><strong>Amount:</strong> ${order.price}</p>
                    <p><strong>Status:</strong> ${capitalizeFirst(order.status)}</p>
                    <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
                </div>
                <button class="btn btn-primary btn-full" onclick="openAdminDashboard()" style="margin-top: 1.5rem;">Back to Dashboard</button>
            </div>
        `;
    }
}

function downloadOrdersCSV() {
    const orders = loadFromLocalStorage('orders') || [];
    
    const headers = ['Order ID', 'Customer', 'Phone Model', 'Design Type', 'WhatsApp', 'Location', 'Amount', 'Status', 'Date'];
    const rows = orders.map(o => [
        o.id,
        o.name,
        o.phoneModel,
        o.designType,
        o.whatsapp,
        o.location,
        o.price,
        o.status,
        new Date(o.date).toLocaleDateString()
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelpocket-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('CSV downloaded successfully');
}

function clearCompletedOrders() {
    if (confirm('Are you sure you want to delete all completed orders?')) {
        const orders = loadFromLocalStorage('orders') || [];
        const activeOrders = orders.filter(o => o.status !== 'delivered');
        saveToLocalStorage('orders', activeOrders);
        openAdminDashboard();
        showNotification('Completed orders cleared');
    }
}

// Utility Functions
function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Event Listeners
function setupEventListeners() {
    // Add slide-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease both';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-header, .design-card, .review-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);