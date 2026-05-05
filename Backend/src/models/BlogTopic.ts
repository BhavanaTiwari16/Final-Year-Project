import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";

const sequelize = db.getInstance();

interface BlogTopicAttributes {
    id: number;
    blog_id: number;
    topic_id: number;
}

interface BlogTopicCreationAttributes extends Optional<BlogTopicAttributes, "id"> {}

export class BlogTopic extends Model<BlogTopicAttributes, BlogTopicCreationAttributes>
    implements BlogTopicAttributes {
    declare id: number;
    declare blog_id: number;
    declare topic_id: number;
}

BlogTopic.init({
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blog_id:  { type: DataTypes.INTEGER, allowNull: false },
    topic_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize,
    modelName: "BlogTopic",
    tableName: "BlogTopics",
    timestamps: false
});
