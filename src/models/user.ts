import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

export const User = mongoose.model<IUser>('User', userSchema);