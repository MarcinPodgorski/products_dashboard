import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';
import { Category } from './entities/Category';
import { User } from './entities/User';
import { addUser } from './routes/user';
import { getProducts } from './routes/product';
import { fetchAndSaveProducts } from './utils/fetchAndSaveProducts';

dotenv.config();
const app = express();

app.use(express.json());

fetchAndSaveProducts()

app.get('/test', (_req, res) => {
    res.send("API Działa");
})

app.get('/products', getProducts)
  
app.post('/users', addUser)

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