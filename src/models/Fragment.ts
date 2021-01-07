import { DataTypes, Model, Optional } from "sequelize";
import { MyModels } from ".";
import { sequelize } from "./_instance";

export interface FragmentAttributes {
  text: string;
  like: number;
  SectionId?: string;
}

interface FragmentCreationAttributes extends FragmentAttributes {}

interface FragmentInstance
  extends Model<FragmentAttributes, FragmentCreationAttributes>,
    FragmentAttributes {}

const Fragment = sequelize.define<FragmentInstance>("Fragment", {
  text: DataTypes.STRING,
  like: DataTypes.INTEGER,
});

//@ts-ignore
Fragment.associate = function (models: MyModels) {
  Fragment.belongsTo(models.Section);
};

export default Fragment;
