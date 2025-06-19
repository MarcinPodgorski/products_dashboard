import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    BeforeInsert,
  } from 'typeorm';
  import { Category } from './Category';
  import bcrypt from 'bcryptjs';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ unique: true })
    email!: string;
  
    @Column({ unique: true })
    username!: string;
  
    @Column()
    password!: string;
  
    @CreateDateColumn()
    creationAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @ManyToMany(() => Category)
    @JoinTable()
    categories!: Category[];
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    async validatePassword(input: string): Promise<boolean> {
      return bcrypt.compare(input, this.password);
    }
  }
  