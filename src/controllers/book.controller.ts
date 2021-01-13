import { Request, Response } from "express";
import { getCustomRepository, getManager } from "typeorm";
import { BookRespository } from "../entity/bookRepository";
import { fireStore } from "../entity/firestore";

const createBook = async (req: Request, res: Response) => {
  const { bookName } = req.body;
  // const bookRepository = getCustomRepository(BookRespository);
  // const savedBook = await bookRepository.createBook(bookName);
  const savedBook = await fireStore.addBook(bookName);
  console.log(savedBook);
  return res.json(savedBook);
};

const getBooks = async (req: Request, res: Response) => {
  // const allBooks = await getCustomRepository(BookRespository).getallbooks();
  const allBooks = await fireStore.getAllBooks();
  res.json(allBooks);
};

export const BookController = { createBook, getBooks };
