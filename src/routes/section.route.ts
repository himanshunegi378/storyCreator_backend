import { Application } from "express";
import { SectionController } from "../controllers";
export default function sectionRoutes(app: Application) {
  app.post("/createSection", SectionController.createSection);
  app.get("/section", SectionController.getAllSectionsInBook);
}
