import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { comparePasswords, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { Request, Response } from 'express';

export async function login(req: Request, res: Response):Promise<any> {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({ email });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch: boolean = await comparePasswords(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
    res.json({ 
        token,
        user: {
            username: user.username,
            email: user.email
        }
    });
};

export async function register (req: Request, res: Response):Promise<any> {
    try {
        const isStrongPassword = (password:string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        
        const { email, username, password } = req.body;
        
        const userRepo = AppDataSource.getRepository(User)
        const userExists = await userRepo.findOneBy({ email });
    
        if (userExists) {
            return res.status(400).json({ message: 'The user with this email already exists'});
        };
    
        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: 'The password is too weak.' });
        };
    
        const passwordHash = await hashPassword(password);
    
        const newUser = userRepo.create({ email, username, password: passwordHash, isAdmin: false, categories: [] });
        await userRepo.save(newUser);

        console.log('New user created.')
        return res.status(201).json({ message: "Register successful"})
        
    } catch (error) {
        return res.status(500).json({ message: error });        
    }
}