import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      owner: req.user._id
    };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`);
    } else {
      return res.status(400).json({ message: 'Se requiere al menos una imagen' });
    }

    // Parse tags if they exist
    if (req.body.tags) {
      try {
        productData.tags = JSON.parse(req.body.tags);
      } catch (error) {
        productData.tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
    }

    const product = await Product.create(productData);
    
    const populatedProduct = await Product.findById(product._id)
      .populate('owner', 'name location rating totalRatings');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error al crear producto', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, search, status = 'disponible', featured } = req.query;
    let query = { status };

    if (category && category !== 'todas' && category !== 'Todas') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let products;
    
    if (featured === 'true') {
      // Para productos destacados, obtener los más recientes con mejor rating del owner
      products = await Product.find(query)
        .populate('owner', 'name location rating totalRatings')
        .sort({ 'owner.rating': -1, createdAt: -1 })
        .limit(3);
    } else {
      products = await Product.find(query)
        .populate('owner', 'name location rating totalRatings')
        .sort('-createdAt');
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id })
      .sort('-createdAt');
    res.json(products);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Error al obtener productos del usuario', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      
      // If there are existing images in the request body, combine them
      if (updateData.existingImages) {
        try {
          const existingImages = JSON.parse(updateData.existingImages);
          updateData.images = [...existingImages, ...newImages];
        } catch (error) {
          updateData.images = newImages;
        }
        delete updateData.existingImages;
      } else {
        updateData.images = newImages;
      }
    } else if (updateData.existingImages) {
      // Only existing images, no new ones
      try {
        updateData.images = JSON.parse(updateData.existingImages);
      } catch (error) {
        // Keep existing images as is
      }
      delete updateData.existingImages;
    }

    // Parse tags if they exist
    if (updateData.tags) {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (error) {
        updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
    }

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true }
    ).populate('owner', 'name location rating totalRatings');

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Delete associated image files
    if (product.images && product.images.length > 0) {
      product.images.forEach(imagePath => {
        if (imagePath.startsWith('/uploads/')) {
          const fullPath = path.join(process.cwd(), imagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

export const toggleProductAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { status: available ? 'disponible' : 'no_disponible' },
      { new: true }
    ).populate('owner', 'name location rating totalRatings');

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error toggling product availability:', error);
    res.status(500).json({ message: 'Error al cambiar disponibilidad', error: error.message });
  }
};