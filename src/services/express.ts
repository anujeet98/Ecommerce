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
    app.use(express.static(path.join(__dirname, '../../client/build')));


    app.use('/api', userRoutes);
    app.use('/api', productRoutes);
    app.use('/api', cartRoutes);
    app.use('/api', orderRoutes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });

    return app;
}