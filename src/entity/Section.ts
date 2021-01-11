import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Book } from "./Book";
import { Fragment } from "./Fragment";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  lock?: boolean;

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
