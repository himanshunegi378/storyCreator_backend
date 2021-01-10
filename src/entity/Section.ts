import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Book } from "./Book";
import { Fragment } from "./Fragment";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Section)
  @JoinColumn({ name: "previousSectionId" })
  previousSection?: Section;

  @OneToOne(() => Section)
  @JoinColumn()
  nextSection?: Section;

  @OneToMany(() => Fragment, (Fragment) => Fragment.section)
  fragments?: Fragment[];

  @ManyToOne(() => Book, (book) => book.sections)
  @JoinColumn({ name: "bookId" })
  book?: Book;
}
