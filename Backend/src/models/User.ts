import {DataTypes,Model,Optional } from "sequelize";
import { db } from "../config/db";
import { UserRole } from "../common/enums/userRole.enum";
const sequelize=db.getInstance();
//using encapsulation we are trying to get instance Of the sequelize object which is maintianing the connections,so that we can use its functions

interface UserAttributes {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    stage?: string;   // 👈 ADD THIS
    password?: string;
    ph_no?: string;
    role?: UserRole;
    isRegistered?: boolean;
}
interface UserCreationAttributes extends Optional<UserAttributes,"id"|"isRegistered">{}

export class User extends Model<UserAttributes,UserCreationAttributes>implements UserAttributes{
    declare id:number;
    declare email: string;
    declare firstName?:string;
    declare lastName?:string;
    declare stage?:string;
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
       firstName:{
        type:DataTypes.STRING,
       },
       lastName:{
        type:DataTypes.STRING,
       },
       stage:{
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