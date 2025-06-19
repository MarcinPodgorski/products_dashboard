import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('decimal')
  price!: number;

  @Column('text')
  description!: string;

  @Column('simple-array')
  images!: string[];

  @CreateDateColumn()
  creationAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Category, category => category.products, { eager: true })
  category!: Category;
}
