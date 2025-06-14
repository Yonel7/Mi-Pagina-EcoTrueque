import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      bio: user.bio,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      bio: user.bio,
      phone: user.phone,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, location, bio, phone, currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Update basic info
    if (name) user.name = name;
    if (email) user.email = email;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (phone !== undefined) user.phone = phone;

    // Handle password change
    if (currentPassword && newPassword) {
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: 'Contraseña actual incorrecta' });
      }
      user.password = newPassword;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      bio: user.bio,
      phone: user.phone,
      rating: user.rating,
      totalRatings: user.totalRatings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};