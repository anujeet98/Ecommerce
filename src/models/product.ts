import mongoose, {Document, Schema} from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    image_url: String;
    date: Date;
    deleted: String;
}

const productSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    image_url: { 
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deleted: {
        type: String,
        required: true,
        enum: ['Y', 'N'],
        default: 'N',
    }
});

export default mongoose.model<IProduct>('Product', productSchema);
