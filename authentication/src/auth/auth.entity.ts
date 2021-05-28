import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fname: string
    @Column()
    lname: string
    @Column()
    username: string
    @Column()
    email: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

}