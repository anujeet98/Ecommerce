import cors from 'cors';
import express, {Application} from "express";
import userRoutes from '../routes/user';
import productRoutes from '../routes/product';
import cartRoutes from '../routes/cart';
import orderRoutes from '../routes/order';
import path from 'path';

export default async (app: Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname,'client','build','index.html'));
        });
    }


    app.use('/api', userRoutes);
    app.use('/api', productRoutes);
    app.use('/api', cartRoutes);
    app.use('/api', orderRoutes);

    return app;
}