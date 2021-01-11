import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SectionRepository } from "../entity/sectionRepository";

const createSection = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const savedSection = await getCustomRepository(
    SectionRepository
  ).createSection(bookId);
  return res.json(savedSection);
};

const getAllSectionsInBook = async (req: Request, res: Response) => {
  const { bookId } = req.query;
  const sections = await getCustomRepository(
    SectionRepository
  ).getAllSectionsInbook(bookId as string);
  return res.json(sections);
};

const lockSection = async (req: Request, res: Response) => {
  const { sectionId } = req.body;
  const lockedSection = await getCustomRepository(
    SectionRepository
  ).lockSection(sectionId);
  res.json(lockedSection);
};

export const SectionController = {
  createSection,
  getAllSectionsInBook,
  lockSection,
};
