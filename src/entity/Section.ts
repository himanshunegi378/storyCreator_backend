import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Book } from "./Book";
import { Fragment } from "./Fragment";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Fragment, (Fragment) => Fragment.section)
  fragments?: Fragment[];

  @ManyToOne(() => Book, (book) => book.sections)
  book?: Book;
}
