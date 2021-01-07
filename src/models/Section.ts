import { DataTypes, Model, Optional } from "sequelize";
import { MyModels } from ".";
import { sequelize } from "./_instance";
interface SectionAttributes {
  id: string;
}

interface SectionCreationAttributes extends SectionAttributes {}

interface SectionInstance
  extends Model<SectionAttributes, SectionCreationAttributes>,
    SectionAttributes {}

const Section = sequelize.define<SectionInstance>(
  "Section",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {}
);
//@ts-ignore
Section.associate = function (models: MyModels) {
  Section.hasMany(models.Fragment, { as: "fragments" });
};
export default Section;
