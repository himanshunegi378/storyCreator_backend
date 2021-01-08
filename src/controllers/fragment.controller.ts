import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FragmentRespository } from "../entity/fragmentRepository";

const createFragment = async (req: Request, res: Response) => {
  const { sectionId, text } = req.body;
  const newFragment = await getCustomRepository(
    FragmentRespository
  ).createfragment(sectionId, text);
  return res.json(newFragment);
};

const getAllFragmentsInSection = async (req: Request, res: Response) => {
  const { sectionId } = req.query;
  const fragments = await getCustomRepository(
    FragmentRespository
  ).getAllFragmentsInSection(sectionId as string);
  return res.json(fragments);
};

export const Fragmentcontroller = { createFragment, getAllFragmentsInSection };
