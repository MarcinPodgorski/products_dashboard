import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { comparePasswords } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { Request, Response } from 'express';

export async function login(req: Request, res: Response):Promise<any> {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ email });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });

    res.json({ token });
};