import express from "express";
import { sequelize } from "./models";

const app = express();

sequelize
  .authenticate()
  .then((reason) => console.log(reason))
  .catch((err) => console.log(err));

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);

export default app;
