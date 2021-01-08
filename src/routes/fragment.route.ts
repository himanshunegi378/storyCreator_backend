import { Application } from "express";
import { Fragmentcontroller } from "../controllers/fragment.controller";

export default function fragmentRoutes(app: Application) {
  app.post("/createFragment", Fragmentcontroller.createFragment);
  app.get("/fragment", Fragmentcontroller.getAllFragmentsInSection);
}
