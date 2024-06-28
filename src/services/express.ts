import express, {Application} from "express";
import userRoutes from '../routes/user_routes';

export default async (app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));


    app.use('/user', userRoutes);

    return app;
}