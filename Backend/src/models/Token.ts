import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

const sequelize = db.getInstance();

interface TokenAttributes {
  id: number;
  user_id: number;
  refresh_token?: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

export class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  declare id: number;
  declare user_id: number;
  declare refresh_token: string;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName:"Tokens",
    timestamps: true,
    indexes:[
      {
        unique:true,
        fields:["user_id"]
      }
    ]
  }
);