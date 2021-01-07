import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Section } from "./Section";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Section, (section) => section.book)
  sections?: Section[];
}
