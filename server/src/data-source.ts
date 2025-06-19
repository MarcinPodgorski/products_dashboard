import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Product } from './entities/Product';
import { Category } from './entities/Category';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // true tylko w dev — tworzy/aktualizuje tabele automatycznie
  logging: false,
  entities: [Product, Category, User],
});
