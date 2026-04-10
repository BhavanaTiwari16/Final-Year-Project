import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

const sequelize = db.getInstance();

interface EmailVerificationAttributes {
  id: number;
  email: string;
  otp: string;
}

interface EmailVerificationCreationAttributes
  extends Optional<EmailVerificationAttributes, "id"> {}

export class EmailVerification
  extends Model<
    EmailVerificationAttributes,
    EmailVerificationCreationAttributes
  >
  implements EmailVerificationAttributes
{
  declare id: number;
  declare email: string;
  declare otp: string;
}

EmailVerification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "EmailVerification",
    tableName:"EmailVerifications",
    timestamps: true,
  }
);