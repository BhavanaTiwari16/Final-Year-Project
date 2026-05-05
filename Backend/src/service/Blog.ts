import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../config/db";
import { BlogStatus } from "../common/enums/blogStatus.enum";
import { User } from "./User";
import { Topic } from "./Topic";


const sequelize = db.getInstance();

interface BlogAttributes{
    id:number;
    author_id:number;
    topic_id:number;
    title:string;
    content:string;
    status:BlogStatus;
    banner_img?:String;
}

interface BlogCreationAttributes extends Optional<BlogAttributes,"id"|"banner_img">{}

export class Blog extends Model<BlogAttributes,BlogCreationAttributes>
implements BlogAttributes{
    declare id:number;
    declare author_id: number;
    declare topic_id:number;
    declare title: string;
    declare content: string;
    declare status: BlogStatus;
    declare banner_img?: String;
}

Blog.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        author_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        topic_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM(...Object.values(BlogStatus)),
            defaultValue:BlogStatus.DRAFT,
        },
        banner_img:{
            type:DataTypes.STRING,
            allowNull:true,
        },

    },{
        sequelize,
        modelName:"Blog",
        tableName:"Blogs",
        timestamps:true
    }
)