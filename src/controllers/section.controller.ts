import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SectionRespository } from "../entity/sectionRepository";

const createSection = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const savedSection = await getCustomRepository(
    SectionRespository
  ).createSection(bookId);
  return res.json(savedSection);
};

const getAllSectionsInBook = async (req: Request, res: Response) => {
  const { bookId } = req.query;
  const sections = await getCustomRepository(
    SectionRespository
  ).getAllSectionsInbook(bookId as string);
  return res.json(sections);
};

export const SectionController = { createSection, getAllSectionsInBook };
