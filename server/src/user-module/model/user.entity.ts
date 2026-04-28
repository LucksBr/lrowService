import AbstractEntity from "src/core/model/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends AbstractEntity {
    
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    email!: string

    @Column()
    password!: string

}