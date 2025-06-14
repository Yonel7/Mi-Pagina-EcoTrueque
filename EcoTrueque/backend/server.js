import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://creative-mooncake-f23bcf.netlify.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mock data for demo
const mockUsers = new Map();
const mockProducts = [
  {
    _id: '1',
    title: 'Macetas Recicladas de Botellas',
    description: 'Hermosas macetas hechas con botellas de plástico recicladas. Perfectas para plantas pequeñas y medianas.',
    category: 'Decoración',
    images: ['https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg'],
    condition: 'como_nuevo',
    owner: {
      _id: '1',
      name: 'María González',
      location: 'Lima, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Kit de Compostaje Casero',
    description: 'Kit completo para iniciar tu propio compostaje en casa. Incluye contenedor, guía de uso y materiales iniciales.',
    category: 'Jardín',
    images: ['https://http2.mlstatic.com/D_NQ_NP_894176-MLA73022695022_112023-O.webp'],
    condition: 'nuevo',
    owner: {
      _id: '2',
      name: 'Carlos Rodríguez',
      location: 'Arequipa, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Bolsas Ecológicas Reutilizables',
    description: 'Set de 5 bolsas reutilizables para compras, hechas con tela reciclada. Resistentes y lavables.',
    category: 'Hogar',
    images: ['https://materialesecologicos.es/wp-content/uploads/2019/02/bolsas-ecologicas-768x944.jpg'],
    condition: 'buen_estado',
    owner: {
      _id: '3',
      name: 'Laura Martínez',
      location: 'Cusco, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Lámpara Solar Decorativa',
    description: 'Lámpara decorativa que funciona con energía solar. Ideal para jardines y espacios exteriores.',
    category: 'Iluminación',
    images: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg'],
    condition: 'como_nuevo',
    owner: {
      _id: '4',
      name: 'Pedro Sánchez',
      location: 'Trujillo, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  },
  {
    _id: '5',
    title: 'Cuadernos de Papel Reciclado',
    description: 'Pack de 3 cuadernos hechos con papel 100% reciclado. Varios tamaños disponibles.',
    category: 'Papelería',
    images: ['https://escolofi.com/store/wp-content/uploads/2020/06/cuaderno-reciclado-a7-espiral-1024x1024.png'],
    condition: 'nuevo',
    owner: {
      _id: '5',
      name: 'Ana López',
      location: 'Piura, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  },
  {
    _id: '6',
    title: 'Jabones Artesanales Naturales',
    description: 'Jabones naturales hechos a mano con ingredientes orgánicos. Sin químicos dañinos.',
    category: 'Cuidado Personal',
    images: ['https://jabonagranel.com/wp-content/uploads/2023/04/la-magia-de-los-jabones-artesanales-hechos-a-mano-con-ingredientes-naturales.jpg'],
    condition: 'nuevo',
    owner: {
      _id: '6',
      name: 'Roberto Silva',
      location: 'Iquitos, Perú'
    },
    status: 'disponible',
    createdAt: new Date().toISOString()
  }
];

let userProducts = [];
let nextProductId = 7;

// Auth routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Check if user already exists
    if (mockUsers.has(email)) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const userId = Date.now().toString();
    const user = {
      _id: userId,
      name,
      email,
      password // In real app, this would be hashed
    };

    mockUsers.set(email, user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: `demo_token_${userId}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Demo user
    if (email === 'demo@ecotrueque.com' && password === 'demo123') {
      return res.json({
        _id: 'demo_user',
        name: 'Usuario Demo',
        email: 'demo@ecotrueque.com',
        token: 'demo_token_123'
      });
    }

    // Check registered users
    const user = mockUsers.get(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: `demo_token_${user._id}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

// Products routes
app.get('/api/products', (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredProducts = [...mockProducts, ...userProducts];
    
    // Filter by category
    if (category && category !== 'todas' && category !== 'Todas') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const { title, description, category, condition, images } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    if (!title || !description || !category || !condition) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newProduct = {
      _id: nextProductId.toString(),
      title,
      description,
      category,
      condition,
      images: images || ['https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg'],
      owner: {
        _id: 'demo_user',
        name: 'Usuario Demo',
        location: 'Lima, Perú'
      },
      status: 'disponible',
      createdAt: new Date().toISOString()
    };

    userProducts.push(newProduct);
    nextProductId++;

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

app.get('/api/products/user', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    // Return user's products
    const userOwnedProducts = userProducts.filter(p => p.owner._id === 'demo_user');
    res.json(userOwnedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos del usuario', error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const productIndex = userProducts.findIndex(p => p._id === id && p.owner._id === 'demo_user');
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    userProducts.splice(productIndex, 1);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

// Trades routes
app.post('/api/trades', (req, res) => {
  try {
    const { productOfferedId, productRequestedId } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    if (!productOfferedId || !productRequestedId) {
      return res.status(400).json({ message: 'IDs de productos requeridos' });
    }

    // Simulate trade proposal
    res.status(201).json({
      _id: Date.now().toString(),
      productOffered: productOfferedId,
      productRequested: productRequestedId,
      requester: 'demo_user',
      status: 'pendiente',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al proponer trueque', error: error.message });
  }
});

app.get('/api/trades/user', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    // Return empty trades for demo
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trueques', error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'EcoTrueque API funcionando correctamente!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    mode: 'demo'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: `Ruta ${req.originalUrl} no encontrada` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💾 Modo: Demo (sin base de datos)`);
  console.log(`\n✅ CREDENCIALES DE DEMO:`);
  console.log(`   📧 Email: demo@ecotrueque.com`);
  console.log(`   🔑 Password: demo123`);
  console.log(`   📝 O regístrate con cualquier email/password\n`);
});