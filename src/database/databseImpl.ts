interface DatabaseImpl {
  addBook: (bookName: string) => Promise<boolean>;
  getAllBooks: () => Promise<{ id: string | number; name: string | string }[]>;
  addSection: (bookId: string | number) => Promise<boolean>;
  getAllSectionsInBook: (
    bookId: string | number
  ) => Promise<{ id: string | number; lock: boolean }[]>;
  lockSection: (sectionId: string | number) => Promise<boolean>;
  addFragment: (sectionId: string | number, text: string) => Promise<boolean>;
  getAllFragmentsInSection: (
    sectionId: string | number
  ) => Promise<{ id: string | number; text: string; like: number }[]>;
  likeFragment: (fragmentId: string | number) => Promise<boolean>;
}
export default DatabaseImpl;
