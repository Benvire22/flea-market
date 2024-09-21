import mongoose, { Types } from 'mongoose';
import { ProductMutation } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const ProductSchema = new Schema<ProductMutation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await User.findById(value);
        return Boolean(category);
      },
      message: 'User not found!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;