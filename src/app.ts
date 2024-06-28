import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbconnection from "./services/db";
import expressApp from "./services/express";

const serverInit = async() => {
    try{
        const app = express();
        await dbconnection();
        await expressApp(app);


        const PORT = process.env.PORT || 3000;
        app.listen(PORT, ()=>{
            console.log(`server running on port :: ${PORT}`);
        });
    }
    catch(err){
        console.error("ServerInit Error..");
    }
}

serverInit();


