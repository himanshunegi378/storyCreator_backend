import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book.route";
import init from "./entity/connection";
import sectionRoutes from "./routes/section.route";
import fragmentRoutes from "./routes/fragment.route";
init();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);
bookRoutes(app);
sectionRoutes(app);
fragmentRoutes(app);
// app.get("/bookList", async (req: express.Request, res: express.Response) => {
//   const bookRepository = getRepository(Book);
//   try {
//     const books = await bookRepository.find();
//     return res.json(books);
//   } catch (e) {
//     return res.json({
//       status: 0,
//       code: "ERROR",
//       msg: "unable to find books in database",
//     });
//   }
// });

/**Return all sections for give bookId */
// app.get("/sections", (req: express.Request, res: express.Response) => {});

// app.post("/createBook", async (req: express.Request, res: express.Response) => {
//   const { name } = req.body;
//   console.log(req.body);
//   const newBook = new Book();
//   newBook.name = name;
//   try {
//     await (await connection).manager.save(newBook);
//     return res.json(newBook);
//   } catch (e) {
//     console.log(e);
//     return res.json({
//       status: 0,
//       code: "ERROR",
//       msg: "unable to create book",
//     });
//   }
// });

// app.post("/addSection", async (req: express.Request, res: express.Response) => {
//   const { bookId } = req.body;

//   const bookRepository = getRepository(Book);
//   try {
//     const book = await bookRepository.findOne(bookId);
//     const newSection = new Section();
//     newSection.book = book;
//     await (await connection).manager.save(newSection);
//     return res.json({ ...newSection });
//   } catch (e) {
//     return res.json({
//       status: 0,
//       code: "ERROR",
//       msg: "unable to Add section",
//     });
//   }
// });

// /**return all fragments in give section id */
// app.get("/fragment", (req: express.Request, res: express.Response) => {});

// app.post(
//   "/addFragment",
//   async (req: express.Request, res: express.Response) => {
//     const { text, sectionId } = req.body;
//     const sectionRepository = getRepository(Section);
//     try {
//       const section = await sectionRepository.findOne(sectionId); //fetch section with whick fragment will be associated
//       const fragment = new Fragment();
//       fragment.text = text;
//       fragment.like = 0;
//       fragment.section = section; //associate section with fragment
//       await (await connection).manager.save(fragment); //save fragment to database
//       return res.json(fragment);
//     } catch (e) {
//       return res.json({
//         status: 0,
//         code: "ERROR",
//         msg: "unable to Add fragment",
//       });
//     }
//   }
// );

export default app;
