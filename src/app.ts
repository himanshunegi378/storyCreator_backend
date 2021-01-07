import "reflect-metadata";
import express from "express";
import { createConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
import cors from "cors";
import { Fragment } from "./entity/Fragment";
import { Section } from "./entity/Section";
import { Book } from "./entity/Book";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const connection = (async function () {
  return await createConnection({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "3rdMAY1998@",
    database: "storycreator",
    entities: [__dirname + "/entity/*.{ts,js}"],
    synchronize: true,
  });
})();
// createConnection({
//   type: "mysql",
//   host: "127.0.0.1",
//   port: 3306,
//   username: "root",
//   password: "3rdMAY1998@",
//   database: "storycreator",
//   entities: [__dirname + "/enconsole.log('called')tity/*.ts"],
//   synchronize: true,
// })
//   .then(async (connection) => {
//     console.log("Inserting a new user into the database...");

//     const fragment1 = new Fragment();
//     fragment1.text = "Timber";
//     fragment1.like = 10;
//     // await connection.manager.save(fragment1);

//     const fragment2 = new Fragment();
//     fragment2.text = "Timber";
//     fragment2.like = 10;
//     // await connection.manager.save(fragment1);

//     const section = new Section();
//     section.fragments = [fragment1, fragment2];
//     const users = await connection.manager.find(section);
//   })
//   .catch((error) => console.log(error));

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);

app.get("/bookList", async (req: express.Request, res: express.Response) => {
  const bookRepository = getRepository(Book);
  const books = await bookRepository.find();
  res.json(books);
});

app.post("/createBook", async (req: express.Request, res: express.Response) => {
  const newBook = new Book();
  await (await connection).manager.save(newBook);
  res.json(newBook);
});

app.post("/addSection", async (req: express.Request, res: express.Response) => {
  const { bookId } = req.body;
  const bookRepository = getRepository(Book);
  const book = await bookRepository.findOne(bookId);
  const newSection = new Section();
  newSection.book = book;
  await (await connection).manager.save(newSection);
  res.json({ ...newSection });
});

app.post(
  "/addFragment",
  async (req: express.Request, res: express.Response) => {
    const { text, sectionId } = req.body;
    const sectionRepository = getRepository(Section);
    const section = await sectionRepository.findOne(sectionId);

    const fragment = new Fragment();
    fragment.text = text;
    fragment.like = 0;
    fragment.section = section;
    await (await connection).manager.save(fragment);
    res.json(fragment);
  }
);

export default app;
