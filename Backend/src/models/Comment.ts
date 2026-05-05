import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

const sequelize = db.getInstance();

interface CommentAttributes {
    id: number;
    user_id: number;
    blog_id: number;
    content: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

export class Comment extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes {
    declare id: number;
    declare user_id: number;
    declare blog_id: number;
    declare content: string;
}

Comment.init({
    id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    blog_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT,    allowNull: false }
}, {
    sequelize,
    modelName: "Comment",
    tableName: "Comments",
    timestamps: true
});
