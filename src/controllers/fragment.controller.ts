import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FragmentRepository } from "../entity/fragmentRepository";

const createFragment = async (req: Request, res: Response) => {
  const { sectionId, text } = req.body;
  const newFragment = await getCustomRepository(
    FragmentRepository
  ).createfragment(sectionId, text);
  return res.json(newFragment);
};

const getAllFragmentsInSection = async (req: Request, res: Response) => {
  const { sectionId } = req.query;
  const fragments = await getCustomRepository(
    FragmentRepository
  ).getAllFragmentsInSection(Number(sectionId as string));
  return res.json(fragments);
};

const addLike = async (req: Request, res: Response) => {
  const { fragmentId } = req.body;
  await getCustomRepository(FragmentRepository).addLikeInFragment(
    fragmentId,
    1
  );
  res.json({ done: "done" });
};

export const Fragmentcontroller = {
  createFragment,
  getAllFragmentsInSection,
  addLike,
};
