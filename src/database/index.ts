import DatabaseImpl from "./databseImpl";

let database: DatabaseImpl;
/**
 * only one type of database could be used once executed
 *
 * @param concreteDatabase typeof database eg: sql,firestore,mongodb from where data neeed to transmitted
 */
function init(concreteDatabase: new () => DatabaseImpl) {
  if (database) {
    throw new Error("Database already initalized");
  }
  database = new concreteDatabase();
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not initialized");
  }
  return database;
}

type Response = {
  status: number;
  errMsg?: string;
  payload?: any;
};

class DatabaseFacade {
  private concreteDatabase: DatabaseImpl;
  constructor(concreteDatabase: new () => DatabaseImpl) {
    this.concreteDatabase = new concreteDatabase();
  }
  async addBook(bookName: string): Promise<Response> {
    try {
      const addedBook = await this.concreteDatabase.addBook(bookName);
      return { status: 1, payload: { addedBook } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async getAllBooks(): Promise<Response> {
    try {
      const allBooks = await this.concreteDatabase.getAllBooks();
      return { status: 1, payload: { allBooks } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async addSection(bookId: string | number): Promise<Response> {
    try {
      const addedSection = await this.concreteDatabase.addSection(bookId);
      return { status: 1, payload: { addedSection } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async getAllSectionsInBook(bookId: string | number): Promise<Response> {
    try {
      const allSectionsInBook = await this.concreteDatabase.getAllSectionsInBook(
        bookId
      );
      return { status: 1, payload: { allSectionsInBook } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async lockSection(sectionId: string | number): Promise<Response> {
    try {
      const lockStatus = await this.concreteDatabase.lockSection(sectionId);
      return { status: 1, payload: { lockStatus } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async addFragment(
    sectionId: string | number,
    text: string
  ): Promise<Response> {
    try {
      const addedFragment = await this.concreteDatabase.addFragment(
        sectionId,
        text
      );
      return { status: 1, payload: { addedFragment } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async getAllFragmentsInSection(
    sectionId: string | number
  ): Promise<Response> {
    try {
      const allFragmentsInSection = await this.concreteDatabase.getAllFragmentsInSection(
        sectionId
      );
      return { status: 1, payload: { allFragmentsInSection } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
  async likeFragment(fragmentId: string | number): Promise<Response> {
    try {
      const liked = await this.concreteDatabase.likeFragment(fragmentId);
      return { status: 1, payload: { liked } };
    } catch (e) {
      return { status: 0, errMsg: e.message };
    }
  }
}

export const Database = { init, getDatabase };
