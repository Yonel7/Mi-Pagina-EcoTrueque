import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      owner: req.user._id
    });
    
    const populatedProduct = await Product.findById(product._id)
      .populate('owner', 'name location');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error al crear producto', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { status: 'disponible' }; // Only show available products

    if (category && category !== 'todas' && category !== 'Todas') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('owner', 'name location')
      .sort('-createdAt');

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
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    ).populate('owner', 'name location');

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

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};