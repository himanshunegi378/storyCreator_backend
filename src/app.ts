import express from "express";
import { sequelize } from "./models";
import Fragment from "./models/Fragment";
import Section from "./models/Section";

const app = express();

const getMethods = (obj: any) =>
  Object.getOwnPropertyNames(obj).filter(
    (item) => typeof obj[item] === "function"
  );

sequelize
  .authenticate()
  .then((reason) => console.log("All good"))
  .catch((err) => console.log(err));

// console.log(Object.keys(Fragment.prototype));
(async function () {
  const section = await Section.findByPk(18);
  if (!section) return;
  //   console.log(section);
  const fragment = Fragment.build({
    text: "First Fragement",
    like: 100,
    // SectionId: section.id,
  });
  //@ts-ignore
  fragment.setSection(section);
  //   fragment.save()
  //@ts-ignore
  //   section.addFragment(fragment);
})();

//@ts-ignore
// console.log(Section.prototype.addFragments.toString());
// console.log(Object.keys(section));
// section.set(fragment);
// section.save()
// fragment.save()
// console.log(fragment);
// console.log(Object.keys(fragment));
//   .then(() => {
//     return fragment.save();
//   })
//   .then(() => {
//     section.save();
//   });
// section
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Express + TypeScript Server")
);

export default app;
