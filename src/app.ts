import express, {Request, Response} from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Testing initial load');
})

app.listen(PORT, ()=>{
    console.log(`server running on port :: ${PORT}`);
});