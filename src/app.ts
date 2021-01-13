import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book.route";
import init from "./entity/connection";
import sectionRoutes from "./routes/section.route";
import fragmentRoutes from "./routes/fragment.route";
import "./entity/firestore";
init();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);
bookRoutes(app);
sectionRoutes(app);
fragmentRoutes(app);

export default app;
