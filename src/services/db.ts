import mongoose from 'mongoose';

const mongoConnect = async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('MongoDB connection established...');
    }
    catch(err){
        console.error('DBError :: Failed to connect with the database');
    }
}   

export default mongoConnect;