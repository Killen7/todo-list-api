import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity
} from 'typeorm';
import { Users } from "./Users";

@Entity()
export class Tareas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Users, Users => Users.tareas)
    users: Users["id"];


    // @ManyToMany(() => Planet)
    // @JoinTable()
    // planets: Planet[];

}