abstract class DatabaseImpl {
  constructor() {}
  abstract addBook(bookName: string): Promise<boolean>;
  abstract getAllBooks(): Promise<
    { id: string | number; name: string | string }[]
  >;
  abstract addSection(bookId: string | number): Promise<boolean>;
  abstract getAllSectionsInBook(
    bookId: string | number
  ): Promise<{ id: string | number; lock: boolean }[]>;
  abstract lockSection(sectionId: string | number): Promise<boolean>;
  abstract addFragment(
    sectionId: string | number,
    text: string
  ): Promise<boolean>;
  abstract getAllFragmentsInSection(
    sectionId: string | number
  ): Promise<{ id: string | number; text: string; like: number }[]>;
  abstract likeFragment(fragmentId: string | number): Promise<boolean>;
}
export default DatabaseImpl;
