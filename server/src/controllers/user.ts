import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Request, Response } from 'express';
import { hashPassword } from "../utils/password";

export async function addUser(req: Request, res: Response): Promise<any> {
  try {
    const { email, username, password, categoryIds } = req.body;

    // Sprawdź czy użytkownik to admin
    // const currentUser = req.user as User;
    // if (!currentUser || !currentUser.isAdmin) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    // Walidacja podstawowa
    if (!email || !username || !password || !Array.isArray(categoryIds)) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const userRepo = AppDataSource.getRepository(User);

    // Sprawdź czy email lub login już istnieje
    const existingUser = await userRepo.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.findBy(categoryIds);

    if (!categories.length) {
      return res.status(400).json({ message: "Invalid category IDs" });
    }

    // Hashowanie hasła
    const hashedPassword = await hashPassword(password);

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    user.categories = categories;
    user.isAdmin = false; // domyślnie zwykły użytkownik

    await userRepo.save(user);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
