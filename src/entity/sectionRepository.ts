import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from "typeorm";
import { Book } from "./Book";
import { BookRespository } from "./bookRepository";
import { FragmentRepository } from "./fragmentRepository";
import { Section } from "./Section";

@EntityRepository()
export class SectionRepository extends AbstractRepository<Section> {
  async createSection(bookId: number) {
    const book = await this.manager
      .getCustomRepository(BookRespository)
      .getbook(bookId);
    if (!book) return { msg: "Book not found" };

    const lastSectionAddedInBook = await this.LastSectionAddedInBook(book.id);
    if (lastSectionAddedInBook) {
      const fragmentCountInLastSection = await this.manager
        .getCustomRepository(FragmentRepository)
        .countFragmentsInSection(lastSectionAddedInBook.id);

      if (fragmentCountInLastSection > 0) {
        const newSection = this.manager.create(Section, {
          book: book,
          previousSection: lastSectionAddedInBook,
        });
        const savedsection = await this.manager.save(newSection);
        lastSectionAddedInBook.nextSection = savedsection;
        await this.manager.save(lastSectionAddedInBook);
        return savedsection;
      } else {
        return { msg: "previous section is empty" };
      }
    } else {
      const newSection = this.manager.create(Section, {
        book: book,
      });
      const savedsection = await this.manager.save(newSection);
      return savedsection;
    }
  }

  async doesSectionContainFragments(sectionId: number) {
    const fragments = await this.manager
      .getCustomRepository(FragmentRepository)
      .getAllFragmentsInSection(sectionId);

    return fragments;
  }

  async lockSection(sectionId: number) {
    const updatedSection = await this.manager
      .createQueryBuilder(Section, "section")
      .update<Section>(Section, { lock: true })
      .where("section.id = :id", { id: sectionId })
      .execute();
    return updatedSection.affected === 1;
  }

  async LastSectionAddedInBook(bookId: number) {
    const lastSectionAddedInBook = await this.manager
      .createQueryBuilder()
      .select("section")
      .from(Section, "section")
      .where("section.bookId = :id", { id: bookId })
      .orderBy("section.id", "DESC")
      .leftJoinAndSelect("section.previousSection", "previousSection")
      .leftJoinAndSelect("section.nextSection", "nextSection")
      .leftJoinAndSelect("section.book", "book")
      .getOne();

    if (!lastSectionAddedInBook) return undefined;
    return lastSectionAddedInBook;
  }

  async getAllSectionsInbook(bookId: string) {
    const sections = await this.manager.find(Section, {
      where: { book: bookId },
      relations: ["previousSection", "nextSection"],
    });
    return sections;
  }
}
