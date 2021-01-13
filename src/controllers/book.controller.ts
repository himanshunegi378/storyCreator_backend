import { Request, Response } from "express";
import { getCustomRepository, getManager } from "typeorm";
import { Database } from "../database";
import { BookRespository } from "../entity/bookRepository";

const createBook = async (req: Request, res: Response) => {
  const { bookName } = req.body;
  const savedBook = await Database.getDatabase().addBook(bookName);
  console.log(savedBook);
  return res.json(savedBook);
};

const getBooks = async (req: Request, res: Response) => {
  const allBooks = await Database.getDatabase().getAllBooks();
  res.json(allBooks);
};

export const BookController = { createBook, getBooks };
