import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";
import { User } from "./User";

const sequelize = db.getInstance();

interface TopicAttributes{
    id:number,
    author_id:number,
    topic:string        
}

interface TopicCreationAttributes extends Optional<TopicAttributes,"id">{}       

export class Topic extends Model<TopicAttributes,TopicCreationAttributes> 
implements TopicAttributes{
    declare id:number;
    declare author_id: number;
    declare topic: string;
}

Topic.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    author_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    topic:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},
{
    sequelize,
    modelName:"Topic",
    tableName:"Topics",
    timestamps:true
})
