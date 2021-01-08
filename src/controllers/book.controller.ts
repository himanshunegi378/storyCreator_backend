import { Request, Response } from "express";
import { getCustomRepository, getManager } from "typeorm";
import { BookRespository } from "../entity/bookRepository";

const createBook = async (req: Request, res: Response) => {
  const { bookName } = req.body;
  const bookRepository = getCustomRepository(BookRespository);
  const savedBook = await bookRepository.createBook(bookName);
  return res.json(savedBook);
};

const getBooks = async (req: Request, res: Response) => {
  const allBooks = await getCustomRepository(BookRespository).getallbooks();
  res.json(allBooks);
};

export const BookController = { createBook, getBooks };
