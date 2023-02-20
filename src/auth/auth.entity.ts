import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string

}