import { Request, Response } from "express";
import { Database } from "../database";
import { failureReponse, successReposponse } from "../utils";
const createBook = async (req: Request, res: Response) => {
  const { bookName } = req.body;
  const savedBook = await Database.getDatabase().addBook(bookName);
  if (savedBook.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", savedBook.errMsg as string));
  }
  return res.json(successReposponse(savedBook.payload));
};

const getBooks = async (req: Request, res: Response) => {
  const allBooks = await Database.getDatabase().getAllBooks();
  if (allBooks.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", allBooks.errMsg as string));
  }
  return res.json(successReposponse(allBooks.payload));
};

export const BookController = { createBook, getBooks };
