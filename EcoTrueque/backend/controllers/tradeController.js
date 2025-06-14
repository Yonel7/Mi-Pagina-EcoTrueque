import Trade from '../models/Trade.js';
import Product from '../models/Product.js';

export const proposeTrade = async (req, res) => {
  try {
    const { productOfferedId, productRequestedId } = req.body;

    const [productOffered, productRequested] = await Promise.all([
      Product.findById(productOfferedId),
      Product.findById(productRequestedId)
    ]);

    if (!productOffered || !productRequested) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (productOffered.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para ofrecer este producto' });
    }

    const trade = await Trade.create({
      productOffered: productOfferedId,
      productRequested: productRequestedId,
      requester: req.user._id,
      owner: productRequested.owner
    });

    await Promise.all([
      Product.findByIdAndUpdate(productOfferedId, { status: 'reservado' }),
      Product.findByIdAndUpdate(productRequestedId, { status: 'reservado' })
    ]);

    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ message: 'Error al proponer trueque', error: error.message });
  }
};

export const respondToTrade = async (req, res) => {
  try {
    const { accept } = req.body;
    const trade = await Trade.findOne({
      _id: req.params.id,
      owner: req.user._id,
      status: 'pendiente'
    });

    if (!trade) {
      return res.status(404).json({ message: 'Trueque no encontrado' });
    }

    if (accept) {
      trade.status = 'completado';
      trade.completedAt = new Date();

      await Promise.all([
        Product.findByIdAndUpdate(trade.productOffered, { status: 'intercambiado' }),
        Product.findByIdAndUpdate(trade.productRequested, { status: 'intercambiado' })
      ]);
    } else {
      trade.status = 'rechazado';

      await Promise.all([
        Product.findByIdAndUpdate(trade.productOffered, { status: 'disponible' }),
        Product.findByIdAndUpdate(trade.productRequested, { status: 'disponible' })
      ]);
    }

    await trade.save();
    res.json(trade);
  } catch (error) {
    res.status(400).json({ message: 'Error al responder al trueque', error: error.message });
  }
};

export const getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.find({
      $or: [{ requester: req.user._id }, { owner: req.user._id }]
    })
      .populate('productOffered')
      .populate('productRequested')
      .populate('requester', 'name')
      .populate('owner', 'name')
      .sort('-createdAt');

    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener trueques', error: error.message });
  }
};