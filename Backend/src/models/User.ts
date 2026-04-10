import {DataTypes,Model,Optional } from "sequelize";
import { db } from "../config/db";
import { UserRole } from "../common/enums/userRole.enum";
const sequelize=db.getInstance();
//using encapsulation we are trying to get instance Of the sequelize object which is maintianing the connections,so that we can use its functions

interface UserAttributes{
    id?:number;
    email:string;
    name?:string;
    password?:string;
    ph_no?:string
    role?:UserRole
    isRegistered?:boolean;
}
interface UserCreationAttributes extends Optional<UserAttributes,"id"|"name"|"password"|"ph_no"|"role"|"isRegistered">{}

export class User extends Model<UserAttributes,UserCreationAttributes>implements UserAttributes{
    declare id:number;
    declare email: string;
    declare name?:string;
    declare password?: string;
    declare ph_no?: string;
    declare role?: UserRole;
    declare isRegistered?: boolean;
}

User.init(
    {
       id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
       } ,
       email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
       },
       name:{
        type:DataTypes.STRING,
       },
       password:{
        type:DataTypes.STRING,
       },
       ph_no:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isNumeric:true,
            len:[10,10]
        }
       },
       role:{
        type:DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue:UserRole.USER
       },
       isRegistered:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
       }
    },{
        sequelize,
        modelName:"User",
        tableName:"Users",
        timestamps:true
    }
)