import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import {Request, Response} from 'express';

export async function addUser(req: Request, res: Response): Promise<any> {
    const { email, username, password, categoryIds } = req.body;

    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.findBy(categoryIds);

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    user.categories = categories;

    const userRepo = AppDataSource.getRepository(User);
    await userRepo.save(user);

    res.status(201).json({message:'User created'})
}