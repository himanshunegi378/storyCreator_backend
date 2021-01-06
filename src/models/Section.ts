import { Model, Optional } from "sequelize";
import { sequelize } from "./_instance";
interface SectionAttributes {}

interface SectionCreationAttributes extends SectionAttributes {}

interface SectionInstance
  extends Model<SectionAttributes, SectionCreationAttributes>,
    SectionAttributes {}

const Section = sequelize.define<SectionInstance>("Section", {});
export default Section;
