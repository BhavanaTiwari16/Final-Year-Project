import { Request,Response } from "express";
import { Topic } from "../models/Topic";
import { Blog } from "../models/Blog";
import { AdminRequest } from "../models/AdminRequest";
import { BlogStatus } from "../common/enums/blogStatus.enum";
import { ReqStatus } from "../common/enums/reqStatus.enum";
import { Result } from "../utils/responder";
import { AppError } from "../utils/AppError";


export class TopicService{
    private topicModel:any;

    constructor(topicModel:any){
        this.topicModel=topicModel;
    }
    
    private getAuthorId(req:Request):any{
        const user=(req as any).user;
        return user.id;
    }

    public async getAllTopic(){
        const topics=await Topic.findAll()
        return Result.success("List of Topic",topics);
    }
    public async getTopic(id:number){
        const topic=await Topic.findByPk(id);
        if(!topic){
            throw new AppError("Topic Not Found",404)
        }
        return Result.success(`Topic with id:${id}:`,topic);
    }
    public async createTopic(req:Request,topicName:string){
        console.log("Request Recieved to services")
        if(!topicName){
           throw new AppError("Please enter Topic",400);
        }
        const authorId=this.getAuthorId(req);
        const ifExist= await this.topicModel.findOne({
            where:{topic:topicName}
        });
        if(ifExist){
            throw new AppError("Topic Already Exists",400);
        }
        const topic=await this.topicModel.create({
            author_id:authorId,
            topic:topicName,
        });
        return Result.success("Succesfully TOpic created",topic);
    }
}