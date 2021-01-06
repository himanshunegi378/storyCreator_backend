import Fragment from "./Fragment";
import Section from "./Section";
import { sequelize } from "./_instance";

const models = {
  Fragment: Fragment,
  Section: Section,
};
type MyModels = typeof models;

//associate all models with whatever they defined
// Object.entries(models).map(([, model]) => {
//   model.associate(models);
// });

export { models, sequelize, MyModels };
