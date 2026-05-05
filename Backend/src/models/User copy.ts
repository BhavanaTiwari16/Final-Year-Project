import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";
import { UserRole } from "../common/enums/userRole.enums";
const sequelize = db.getInstance();
//using encapsulation we are trying to get instance Of the sequelize object which is maintianing the connections,so that we can use its function 
interface UserAttributes {
  id: number;
  name?: string;
  email: string;
  password?: string;
  isRegistered: boolean;
  role:UserRole;
  about?:string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"|"isRegistered"|"role"> {}
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name?: string;
  declare email: string;
  declare password?: string;
  declare isRegistered: boolean;
  declare role:UserRole;
  declare about?:string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    role:{
      type:DataTypes.ENUM(...Object.values(UserRole)),
      allowNull:false,
      defaultValue:UserRole.USER
    },
    about:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName:"Users",
    timestamps: true,
  }
);