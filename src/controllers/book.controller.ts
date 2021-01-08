import { Request, Response } from "express";
import { getConnection, getCustomRepository, getManager } from "typeorm";
import { BookRespository } from "../entity/bookRepository";

const createBook = async (req: Request, response: Response) => {
  const { bookName } = req.body;
  const bookRepository = getCustomRepository(BookRespository);
  const savedBook = await bookRepository.createBook(bookName);
  return response.json(savedBook);
};

const getBooks = async (req: Request, response: Response) => {
  const allBooks = await getCustomRepository(BookRespository).getallbooks();
  response.json(allBooks);
};

export const BookController = { createBook, getBooks };
