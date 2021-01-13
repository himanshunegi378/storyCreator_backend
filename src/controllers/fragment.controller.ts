import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { fireStore } from "../entity/firestore";
import { FragmentRepository } from "../entity/fragmentRepository";

const createFragment = async (req: Request, res: Response) => {
  const { sectionId, text } = req.body;
  // const newFragment = await getCustomRepository(
  //   FragmentRepository
  // ).createfragment(sectionId, text);
  const newFragment = await fireStore.addFragment(sectionId, text);
  return res.json(newFragment);
};

const getAllFragmentsInSection = async (req: Request, res: Response) => {
  const { sectionId } = req.query;
  // const fragments = await getCustomRepository(
  //   FragmentRepository
  // ).getAllFragmentsInSection(Number(sectionId as string));
  const fragments = await fireStore.getAllFragmentInSection(
    sectionId as string
  );
  return res.json(fragments);
};

const addLike = async (req: Request, res: Response) => {
  const { fragmentId } = req.body;
  // await getCustomRepository(FragmentRepository).addLikeInFragment(
  //   fragmentId,
  //   1
  // );
  const status = await fireStore.likeFragment(fragmentId);
  res.json({ done: status });
};

export const Fragmentcontroller = {
  createFragment,
  getAllFragmentsInSection,
  addLike,
};
