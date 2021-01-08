import { Application } from "express";
function sectionRoutes(app: Application) {
  app.post("/createSection");
  app.get("/section");
}
