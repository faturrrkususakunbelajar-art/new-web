const menuData = [
    { id: 1, name: "Kopi Susu Digital", price: 15000, img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400" },
    { id: 2, name: "Burger SEO Hot", price: 35000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
    { id: 3, name: "Dimsum Cloud Mentai", price: 25000, img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400" },
    { id: 4, name: "Donat UI/UX Pink", price: 10000, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400" },
    { id: 5, name: "Nasi Goreng Full Stack", price: 28000, img: "https://images.unsplash.com/photo-1512058560566-43346af0c44b?w=400" },
    { id: 6, name: "Ice Tea JavaScript", price: 8000, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" }
];

let cart = [];

function renderMenu() {
    const container = document.getElementById('product-container');
    container.innerHTML = menuData.map(item => `
        <div class="card">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <span class="price">Rp ${item.price.toLocaleString('id-ID')}</span>
            <button class="btn-add" onclick="addToCart(${item.id})">Tambah</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = menuData.find(p => p.id === id);
    cart.push(item);
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Keranjang kosong.</p>";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name}</span>
                <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
        `).join('');
    }

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    totalPrice.innerText = total.toLocaleString('id-ID');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function sendToWA() {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    
    const phoneNumber = "6285743473837";
    let message = "Halo DigiFood, saya mau pesan:%0A";
    
    cart.forEach(item => {
        message += `- ${item.name} (Rp ${item.price.toLocaleString('id-ID')})%0A`;
    });
    
    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    message += `%0A*Total Pembayaran: Rp ${total.toLocaleString('id-ID')}*`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

renderMenu();
