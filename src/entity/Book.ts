import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Section } from "./Section";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Section, (section) => section.book)
  sections?: Section[];
}
