import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Category {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    image!: string;

    @CreateDateColumn()
    creationAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Product, product => product.category)
    products!: Product[];
}
