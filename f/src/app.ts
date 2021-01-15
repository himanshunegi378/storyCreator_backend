import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book.route";
import sectionRoutes from "./routes/section.route";
import fragmentRoutes from "./routes/fragment.route";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRoutes(app);
sectionRoutes(app);
fragmentRoutes(app);

export default app;
