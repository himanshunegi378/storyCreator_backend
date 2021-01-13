import DatabaseImpl from "../databseImpl";
import admin from "firebase-admin";
const serviceAccount = require("./credentials.json");

export class FirestoreDatabase implements DatabaseImpl {
  private bookCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private sectionCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private fragmentCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    this.bookCollectionRef = db.collection("books");
    this.sectionCollectionRef = db.collection("sections");
    this.fragmentCollectionRef = db.collection("fragments");
  }

  async addBook(bookName: string): Promise<boolean> {
    const result = await this.bookCollectionRef.doc().set({
      name: bookName,
    });

    return result ? true : false;
  }
  async getAllBooks(): Promise<{ id: string | number; name: string }[]> {
    const snapshot = await this.bookCollectionRef.get();
    const data: { id: string | number; name: string }[] = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, name: doc.data().name });
    });
    return data;
  }
  async addSection(bookId: string | number): Promise<boolean> {
    const result = await this.sectionCollectionRef.doc().set({
      lock: false,
      bookId: bookId,
    });
    return result ? true : false;
  }
  async getAllSectionsInBook(
    bookId: string | number
  ): Promise<{ id: string | number; lock: boolean }[]> {
    const allSectionsRef = await this.sectionCollectionRef
      .where("bookId", "==", bookId)
      .get();

    const allSections: { id: string | number; lock: boolean }[] = [];
    allSectionsRef.forEach((doc) => {
      allSections.push({ id: doc.id, lock: doc.data().lock });
    });
    return allSections;
  }
  async lockSection(sectionId: string | number): Promise<boolean> {
    const result = await this.sectionCollectionRef
      .doc(sectionId as string)
      .set({ lock: true }, { merge: true });
    return result ? true : false;
  }
  async addFragment(
    sectionId: string | number,
    text: string
  ): Promise<boolean> {
    const result = await this.fragmentCollectionRef
      .doc()
      .set({ sectionId: sectionId, text: text, like: 0 });
    return result ? true : false;
  }
  async getAllFragmentsInSection(
    sectionId: string | number
  ): Promise<{ id: string | number; text: string; like: number }[]> {
    const allSectionsRef = await this.fragmentCollectionRef
      .where("sectionId", "==", sectionId)
      .get();
    const allFragments: {
      id: string | number;
      text: string;
      like: number;
    }[] = [];
    allSectionsRef.forEach((doc) => {
      const { text, like } = doc.data();
      allFragments.push({ id: doc.id, text, like });
    });
    return allFragments;
  }
  async likeFragment(fragmentId: string | number): Promise<boolean> {
    const result = await this.fragmentCollectionRef
      .doc(fragmentId as string)
      .update({ like: admin.firestore.FieldValue.increment(1) });

    return result ? true : false;
  }
}
