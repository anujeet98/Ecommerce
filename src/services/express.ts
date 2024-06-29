import express, {Application} from "express";
import userRoutes from '../routes/user';
import productRoutes from '../routes/product';

export default async (app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));


    app.use('/api', userRoutes);
    app.use('/api', productRoutes);

    return app;
}