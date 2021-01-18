import { Request, Response } from "express";
import { Database } from "../database";
import { successReposponse } from "../utils";

const createSection = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const savedSection = await Database.getDatabase().addSection(bookId);
  return res.json(successReposponse(savedSection));
};

const getAllSectionsInBook = async (req: Request, res: Response) => {
  const { bookId } = req.query;
  const sections = await Database.getDatabase().getAllSectionsInBook(
    bookId as string
  );
  return res.json(successReposponse(sections));
};

const lockSection = async (req: Request, res: Response) => {
  const { sectionId } = req.body;
  const lockedSection = await Database.getDatabase().lockSection(sectionId);
  res.json(successReposponse({ lock: lockedSection }));
};

export const SectionController = {
  createSection,
  getAllSectionsInBook,
  lockSection,
};
