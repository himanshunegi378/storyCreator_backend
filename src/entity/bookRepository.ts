import { AbstractRepository, EntityManager, EntityRepository } from "typeorm";
import { Book } from "./Book";

@EntityRepository()
export class BookRespository extends AbstractRepository<Book> {
  createBook(bookName: string) {
    const newBook = new Book();
    newBook.name = bookName;
    return this.manager.save(newBook);
  }

  getallbooks() {
    return this.manager.find(Book);
  }
}
