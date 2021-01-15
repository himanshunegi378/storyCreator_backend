import { AbstractRepository, EntityRepository } from "typeorm";
import { Book } from "./Book";

@EntityRepository()
export class BookRespository extends AbstractRepository<Book> {
  async createBook(bookName: string) {
    const newBook = new Book();
    newBook.name = bookName;
    return this.manager.save(newBook);
  }

  async getallbooks() {
    return this.manager.find(Book);
  }

  async getbook(bookId: number) {
    const book = await this.manager.findOne(Book, { where: { id: bookId } });
    return book;
  }
}
