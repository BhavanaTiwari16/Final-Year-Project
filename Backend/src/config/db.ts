    import type{Sequelize as SequelizeType} from "sequelize" // importing the type of sequelize ,i.e we are just import the type to use it for type-checking
    import { Sequelize } from "sequelize";
    //importing Sequelize class 

    class Db{
        private sequelize:SequelizeType;

        constructor(){
            this.sequelize=new Sequelize(
                process.env.DB_NAME as string,
                process.env.DB_UNAME as string,
                process.env.DB_PASS as string,
                {
                    host:'localhost',
                    dialect:'mysql',
                    port:Number(process.env.DB_PORT)
                }
            )
        }

        async connectDb(){
            try{
                await this.sequelize.authenticate();
                console.log("Connection with DB is created");
                await this.sequelize.sync({alter:true});
                console.log("Table Initialized");
            }
            catch(error){
                console.error("Unable to connect to the error",error);
            }
        }
        getInstance():SequelizeType{
            return this.sequelize;
        }// this function will help to get instance of sequeilize as we have created it as private, and implement encapsulation 
    }
    export const db=new Db ();//named export 