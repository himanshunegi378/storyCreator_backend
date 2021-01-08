import { AbstractRepository, EntityRepository } from "typeorm";
import { Book } from "./Book";
import { Section } from "./Section";

@EntityRepository()
export class SectionRespository extends AbstractRepository<Section> {
  async createSection(bookId: string) {
    const book = await this.manager.findOne(Book, { where: { id: bookId } });
    if (!book) return undefined;
    const newSection = this.manager.create(Section, { book: book });
    const savedsection = await this.manager.save(newSection);
    return savedsection;
  }
  async getAllSectionsInbook(bookId: string) {
    const sections = await this.manager.find(Section, {
      where: { book: bookId },
    });
    return sections;
  }
}
