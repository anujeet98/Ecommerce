import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './product';

export interface ICartItem extends Document {
    product: IProduct;
    quantity: number;
    price: number
}

export interface ICart extends Document {
    user: string;
    items: ICartItem[];
    total: number;
}

const cartItemSchema = new Schema({
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: [1, 'Minimum quantity must be 1'],
        default: 1 
    },
    price: {
        type: Number, 
        required: true, 
        min: [1, 'Minimum price must be 1'],
        default: 0 
    }
});

const cartSchema: Schema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true  
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model<ICart>('Cart', cartSchema);
