import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Section } from "./Section";

@Entity()
export class Fragment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  like!: number;

  @ManyToOne(() => Section, (Section) => Section.fragments)
  section?: Section;
}
