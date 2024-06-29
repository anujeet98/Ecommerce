import express, {Application} from "express";
import userRoutes from '../routes/user';
import productRoutes from '../routes/product';
import cartRoutes from '../routes/cart';
import orderRoutes from '../routes/order';

export default async (app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));


    app.use('/api', userRoutes);
    app.use('/api', productRoutes);
    app.use('/api', cartRoutes);
    app.use('/api', orderRoutes);

    return app;
}