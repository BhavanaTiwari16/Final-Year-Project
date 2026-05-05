import path from "path";

require("dotenv").config({
   path: path.resolve(__dirname, "../.env")
});
import express from "express";
import { db } from "./config/db";
import cors from "cors";

import { ErrorHandler } from "./middlewares/errorHandler";
import authRoutes  from "./routes/auth.routes";
import blogRoutes  from "./routes/blog.routes";
import topicRoutes from "./routes/topic.routes";
import userRoutes  from "./routes/user.routes";
import { AssociationMapping } from "./models/Association";

class Server{
    private port:number
    private app=express();
    constructor(port:number){
        this.port=port;
        this.app=express();
    }
    private initializeMiddlewares(){
        this.app.use(express.json());
        this.app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
            }));
    }

    private initializedRoutes(){
        this.app.use("/", authRoutes);
        this.app.use("/blogs", blogRoutes);
        this.app.use("/topics", topicRoutes);
        this.app.use("/users", userRoutes);
    }

    private initializedErrorHandler(){
        this.app.use((req,res)=>{
            res.status(404).json({
                message:"Route Not Found"
            })
        })
        this.app.use(ErrorHandler.handle);
    }

    private async initializeDb(){
        await db.connectDb();
        AssociationMapping.initialize();
    }

    public async start(){
        
        try{
            this.initializeMiddlewares();
            await this.initializeDb();
            this.initializedRoutes();
            this.initializedErrorHandler();
            this.app.listen(this.port,()=>{
                console.log(`App is running on the ${this.port}`)
            })
        }catch(error){
            console.log("Server Started failed",error);
        }
        
    }
}

const s1=new Server(5000);
s1.start();
