// import admin from "firebase-admin";
// const serviceAccount = require("./credentials.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// const bookCollectionRef = db.collection("books");
// const sectionCollectionRef = db.collection("sections");
// const fragmentCollectionRef = db.collection("fragments");

// async function addBook(bookName: string) {
//   return bookCollectionRef.doc().set({
//     name: bookName,
//   });
// }

// async function getAllBooks() {
//   const snapshot = await bookCollectionRef.get();
//   const data: any[] = [];
//   snapshot.forEach((doc) => {
//     data.push({ id: doc.id, name: doc.data().name });
//   });
//   return data;
// }

// async function addSection(bookId: string) {
//   return sectionCollectionRef.doc().set({
//     lock: false,
//     bookId: bookId,
//   });
// }

// async function getAllSectionsInBook(bookId: string) {
//   const allSectionsRef = await sectionCollectionRef
//     .where("bookId", "==", bookId)
//     .get();

//   const allSections: any[] = [];
//   allSectionsRef.forEach((doc) => {
//     allSections.push({ id: doc.id, lock: doc.data().lock });
//   });
//   return allSections;
// }

// async function lockSection(sectionId: string) {
//   return sectionCollectionRef
//     .doc(sectionId)
//     .set({ lock: true }, { merge: true });
// }

// async function addFragment(sectionId: string, text: string) {
//   return fragmentCollectionRef
//     .doc()
//     .set({ sectionId: sectionId, text: text, like: 0 });
// }
// async function getAllFragmentInSection(sectionId: string) {
//   const allSectionsRef = await fragmentCollectionRef
//     .where("sectionId", "==", sectionId)
//     .get();
//   const allFragments: any[] = [];
//   allSectionsRef.forEach((doc) => {
//     const { text, like } = doc.data();
//     allFragments.push({ id: doc.id, text, like });
//   });
//   return allFragments;
// }
// async function likeFragment(fragmentId: string) {
//   return fragmentCollectionRef
//     .doc(fragmentId)
//     .update({ like: admin.firestore.FieldValue.increment(1) });
// }

// export const fireStore = {
//   addBook,
//   getAllBooks,
//   addSection,
//   getAllSectionsInBook,
//   lockSection,
//   addFragment,
//   getAllFragmentInSection,
//   likeFragment,
// };
