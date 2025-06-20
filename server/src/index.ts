import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import productRouter from './routes/product';
import { fetchAndSaveProducts } from './utils/fetchAndSaveProducts';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

app.use(express.json());

fetchAndSaveProducts()

app.get('/test', (_req, res) => {
    res.send("API Działa");
})

app.use('/auth', authRouter)

app.use('/users', userRouter)

app.use('/product', productRouter)

const PORT = process.env.PORT || 6000;

AppDataSource.initialize().
    then(() => {
        app.listen(PORT, (error) => {
            if (error) {
                console.log(error)
            }
            console.log("Serwer dziala");
        })
    })