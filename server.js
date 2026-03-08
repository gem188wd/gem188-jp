const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Database Simulasi Produk (Update Gambar & Metadata)
const products = [
    { 
        id: 1, 
        name: "Gem Master X-1", 
        price: "Rp 4.500.000", 
        category: "Headset",
        isPromo: true,
        isNew: false,
        desc: "Kualitas audio studio dengan fitur noise cancelling tercanggih 2026.", 
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        id: 2, 
        name: "Titan Mechanical v2", 
        price: "Rp 1.850.000", 
        category: "Keyboard",
        isPromo: false,
        isNew: true,
        desc: "Switch optik tercepat dengan kustomisasi RGB jutaan warna.", 
        img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        id: 3, 
        name: "Vision Pro Lens", 
        price: "Rp 22.000.000", 
        category: "Kamera",
        isPromo: true,
        isNew: true,
        desc: "Sensor full-frame untuk menangkap setiap detail cahaya.", 
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        id: 4, 
        name: "Pulse Smartband", 
        price: "Rp 1.200.000", 
        category: "Wearable",
        isPromo: false,
        isNew: false,
        desc: "Pantau kesehatan jantung dan oksigen darah secara real-time dengan sensor presisi.", 
        img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80" 
    },
    { 
        id: 5, 
        name: "Cyber Mouse G-8", 
        price: "Rp 950.000", 
        category: "Gaming",
        isPromo: true,
        isNew: false,
        desc: "Desain ergonomis dengan sensor 25k DPI untuk performa gaming kompetitif.", 
        img: "https://wallpapers.com/images/hd/cyber-mouse-png-eff-nbxar88dfq4kuyhy.png" 
    },
    { 
        id: 6, 
        name: "Infinity Display 27", 
        price: "Rp 5.700.000", 
        category: "Monitor",
        isPromo: false,
        isNew: true,
        desc: "Refresh rate 240Hz dengan akurasi warna Delta E < 2 untuk profesional.", 
        img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80" 
    }
];

// Route Utama dengan Logika Filter
app.get('/', (req, res) => {
    const filterType = req.query.filter;
    const categoryType = req.query.category;

    let filteredProducts = [...products];
    let activeFilter = 'semua';

    if (filterType === 'promo') {
        filteredProducts = products.filter(p => p.isPromo);
        activeFilter = 'promo';
    } else if (filterType === 'terbaru') {
        filteredProducts = products.filter(p => p.isNew);
        activeFilter = 'terbaru';
    } else if (categoryType) {
        filteredProducts = products.filter(p => p.category.toLowerCase() === categoryType.toLowerCase());
        activeFilter = categoryType;
    }

    res.render('index', { 
        products: filteredProducts, 
        activeFilter: activeFilter 
    });
});

app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).send('Produk tidak ditemukan');
    res.render('detail', { product });
});

app.get('/login', (req, res) => res.render('auth', { type: 'login' }));
app.get('/daftar', (req, res) => res.render('auth', { type: 'daftar' }));

app.listen(PORT, () => {
    console.log(`Server Gem188 berjalan di http://localhost:${PORT}`);
});