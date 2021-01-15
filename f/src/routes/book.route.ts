import { Application } from "express";
import { BookController } from "../controllers";
export default function bookRoutes(app: Application) {
  app.post("/createBook", BookController.createBook);
  app.get("/bookList", BookController.getBooks);
}
