import DatabaseImpl from "../databseImpl";
import admin from "firebase-admin";
const serviceAccount = require("./credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export class FirestoreDatabase extends DatabaseImpl {
  private bookCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private sectionCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  private fragmentCollectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor() {
    super();
    const db = admin.firestore();

    this.bookCollectionRef = db.collection("books");
    this.sectionCollectionRef = db.collection("sections");
    this.fragmentCollectionRef = db.collection("fragments");
  }

  async addBook(bookName: string): Promise<{ id: string; name: string }> {
    const result = await this.bookCollectionRef.add({
      name: bookName,
    });

    return { id: result.id, name: bookName };
  }
  async getAllBooks(): Promise<{ id: string | number; name: string }[]> {
    const snapshot = await this.bookCollectionRef.get();
    const data: { id: string | number; name: string }[] = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, name: doc.data().name });
    });
    return data;
  }
  async addSection(
    bookId: string | number
  ): Promise<{ id: string | number; lock: boolean; bookId: string | number }> {
    const result = await this.sectionCollectionRef.add({
      lock: false,
      bookId: bookId,
    });
    return { id: result.id, lock: false, bookId: bookId };
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
      .update({ lock: true });
    console.log(result);
    return result ? true : false;
  }
  async addFragment(
    sectionId: string | number,
    text: string
  ): Promise<{
    id: string | number;
    text: string;
    like: number;
    sectionId: string | number;
  }> {
    const result = await this.fragmentCollectionRef.add({
      sectionId: sectionId,
      text: text,
      like: 0,
    });
    return { id: result.id, sectionId: sectionId, text: text, like: 0 };
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
