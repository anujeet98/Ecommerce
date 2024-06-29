import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './product';

export interface ICartItem extends Document {
    product: IProduct;
    quantity: number;
}

export interface ICart extends Document {
    user: string;
    items: ICartItem[];
}

const cartItemSchema: Schema = new Schema({
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 1 
    }
});

const cartSchema: Schema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [cartItemSchema]
});

export default mongoose.model<ICart>('Cart', cartSchema);
