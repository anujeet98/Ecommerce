import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Testing initial load, watch testing');
})

app.listen(PORT, ()=>{
    console.log(`server running on port :: ${PORT}`);
});