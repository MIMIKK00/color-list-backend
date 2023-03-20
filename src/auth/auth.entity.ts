import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEntity {

    //앞으로 이런게 필요할거야~ > 요구사항(있어야 해)

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string

}