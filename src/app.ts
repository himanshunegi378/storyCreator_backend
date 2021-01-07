import "reflect-metadata";
import express from "express";
import { createConnection, getRepository } from "typeorm";
import cors from "cors";
import { Fragment } from "./entity/Fragment";
import { Section } from "./entity/Section";
import { Book } from "./entity/Book";
import bodyParser from 'body-parser'


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
