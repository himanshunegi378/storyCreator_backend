import { Request, Response } from "express";
import { Database } from "../database";
import { failureReponse, successReposponse } from "../utils";

const createFragment = async (req: Request, res: Response) => {
  const { sectionId, text } = req.body;
  const newFragment = await Database.getDatabase().addFragment(sectionId, text);
  if (newFragment.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", newFragment.errMsg as string));
  }
  return res.json(successReposponse(newFragment.payload));
};

const getAllFragmentsInSection = async (req: Request, res: Response) => {
  const { sectionId } = req.query;
  const fragments = await Database.getDatabase().getAllFragmentsInSection(
    sectionId as string
  );
  if (fragments.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", fragments.errMsg as string));
  }
  return res.json(successReposponse(fragments.payload));
};

const addLike = async (req: Request, res: Response) => {
  const { fragmentId } = req.body;
  const status = await Database.getDatabase().likeFragment(fragmentId);
  if (status.status === 0) {
    return res
      .status(404)
      .json(failureReponse("fail", status.errMsg as string));
  }
  res.json(successReposponse(status.payload));
};

export const Fragmentcontroller = {
  createFragment,
  getAllFragmentsInSection,
  addLike,
};
