import { Request, Response } from "express";
import { Database } from "../database";
import { successReposponse } from "../utils";
const createBook = async (req: Request, res: Response) => {
  const { bookName } = req.body;
  const savedBook = await Database.getDatabase().addBook(bookName);
  return res.json(successReposponse(savedBook));
};

const getBooks = async (req: Request, res: Response) => {
  const allBooks = await Database.getDatabase().getAllBooks();
  res.json(successReposponse(allBooks));
};

export const BookController = { createBook, getBooks };
