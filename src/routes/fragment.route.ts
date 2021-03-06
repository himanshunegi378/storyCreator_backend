import { Application } from "express";
import { Fragmentcontroller } from "../controllers";

export default function fragmentRoutes(app: Application) {
  app.post("/createFragment", Fragmentcontroller.createFragment);
  app.get("/fragment", Fragmentcontroller.getAllFragmentsInSection);
  app.post("/likeFragment", Fragmentcontroller.addLike);
}
