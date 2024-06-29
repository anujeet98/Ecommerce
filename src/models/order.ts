import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product";


export interface IOrderItem extends Document {
    product: IProduct;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user: string;
    items: IOrderItem[];
    totalPrice: number;
    createdAt: Date;
}


const orderItemSchema = new Schema({
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    }
})


const orderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [orderItemSchema],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

export default mongoose.model<IOrder>('Order', orderSchema);