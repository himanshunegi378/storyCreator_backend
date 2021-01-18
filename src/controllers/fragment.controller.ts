import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Database } from "../database";
import { FragmentRepository } from "../entity/fragmentRepository";
import { successReposponse } from "../utils";

const createFragment = async (req: Request, res: Response) => {
  const { sectionId, text } = req.body;
  const newFragment = await Database.getDatabase().addFragment(sectionId, text);
  return res.json(successReposponse(newFragment));
};

const getAllFragmentsInSection = async (req: Request, res: Response) => {
  const { sectionId } = req.query;
  const fragments = await Database.getDatabase().getAllFragmentsInSection(
    sectionId as string
  );
  return res.json(successReposponse(fragments));
};

const addLike = async (req: Request, res: Response) => {
  const { fragmentId } = req.body;
  const status = await Database.getDatabase().likeFragment(fragmentId);
  res.json(successReposponse({ done: status }));
};

export const Fragmentcontroller = {
  createFragment,
  getAllFragmentsInSection,
  addLike,
};
