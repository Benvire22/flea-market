import express from 'express';
import Product from '../models/Product';
import { imagesUpload } from '../multer';
import { ProductMutation } from '../types';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';


const productsReducer = express.Router();

productsReducer.get('/', async (req, res, next) => {
  try {
    const category = req.query.category;

    const products = await Product.find(category ? { category } : {});
    return res.send(products);
  } catch (e) {
    return next(e);
  }
});

productsReducer.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(401).send({ error: 'Invalid product ID!' });
    }

    const product = await Product.findById(req.params.id).populate('user', 'displayName phoneNumber');

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    return res.send(product);
  } catch (error) {
    return next(error);
  }
});

productsReducer.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!req.file) {
      return res.status(404).send({ error: 'All fields required!' });
    }

    const ProductMutation: ProductMutation = {
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category,
      price: parseFloat(req.body.price),
    };

    const product = new Product(ProductMutation);
    await product.save();

    return res.send(product);
  } catch (error) {
    return next(error);
  }
});

productsReducer.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'User not found!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(401).send({ error: 'Invalid product ID!' });
    }

    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product do not be deleted!' });
    }

    return res.send({ response: 'Product was deleted!' });
  } catch (error) {
    return next(error);
  }
});

export default productsReducer;

