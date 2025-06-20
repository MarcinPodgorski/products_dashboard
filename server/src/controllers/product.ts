import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Request, Response } from 'express'

export async function getProducts(_req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Product);
    const products = await repo.find(); // category jest automatycznie załadowana
    res.json(products);
};
