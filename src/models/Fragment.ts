import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./_instance";

export interface FragmentAttributes {
  text: string;
  like: number;
}

interface FragmentCreationAttributes extends FragmentAttributes {}

interface FragmentInstance
  extends Model<FragmentAttributes, FragmentCreationAttributes>,
    FragmentAttributes {}

const Fragment = sequelize.define<FragmentInstance>("Fragment", {
  text: DataTypes.STRING,
  like: DataTypes.INTEGER,
});

export default Fragment;
