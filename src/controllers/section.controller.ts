import { Request, Response } from "express";
import { Database } from "../database";
import { failureReponse, successReposponse } from "../utils";

const createSection = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const savedSection = await Database.getDatabase().addSection(bookId);
  if (savedSection.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", savedSection.errMsg as string));
  }
  return res.json(successReposponse(savedSection.payload));
};

const getAllSectionsInBook = async (req: Request, res: Response) => {
  const { bookId } = req.query;
  const sections = await Database.getDatabase().getAllSectionsInBook(
    bookId as string
  );
  if (sections.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", sections.errMsg as string));
  }
  return res.json(successReposponse(sections.payload));
};

const lockSection = async (req: Request, res: Response) => {
  const { sectionId } = req.body;
  const lockedSection = await Database.getDatabase().lockSection(sectionId);
  if (lockedSection.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", lockedSection.errMsg as string));
  }
  res.json(successReposponse(lockedSection.payload));
};

export const SectionController = {
  createSection,
  getAllSectionsInBook,
  lockSection,
};
