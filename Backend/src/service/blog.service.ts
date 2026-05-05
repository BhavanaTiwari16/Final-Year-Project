import { Request } from "express";
import { BlogStatus } from "../common/enums/blogStatus.enum";
import { Result } from "../utils/responder";
import { Topic } from "../models/Topic";
import { User } from "../models/User";
import { AdminRequest } from "../models/AdminRequest";
import { AppError } from "../utils/AppError";
export class BlogService{
    private blogModel:any;
    
    constructor(blogModel:any){
        this.blogModel=blogModel;
    }

    private getAuthorId(req:Request):any{
        const user=(req as any).user;

        if(!user || !user.id){
           throw new AppError("Unauthorized",403);
        }
        return user.id;
    }

    public async getAllBlog(){
        const blogs=await this.blogModel.findAll({
            where:{
                status:BlogStatus.PUBLISHED
            },
            include:[
        {
            model:User,
            attributes:["firstName","lastName","email"]
        }
    ]
    });
        console.log("Service working");
        return Result.success("ALL BLOGS",blogs);
    }

    public async getBlog(id:number){
        const blog=await this.blogModel.findByPk(id,
           { where:{
                status:BlogStatus.PUBLISHED
            },
            include:[
        {
            model:User,
            attributes:["firstName","lastName","email"]
        }]}
        );
        if(!blog){
            throw (Result.fail("Blog Not Found","404"));
        }
        return Result.success(`Blog with id ${id}:`,blog);
    }

    public async getTopicBlog(topic_id:number){
        const exist=await Topic.findByPk(topic_id);
        
        if(!exist){
           throw new AppError("Topic Does Not Exist",400)
        }
        const blog=await this.blogModel.findAll({
            where:{ topic_id }
        })      //find all returns a promise thats why in if else codition we will explicitly check the length not diretly blog
        if(blog.length === 0){
            throw new AppError("The Blogs on the Topic Doesnt Exist",404);
        }
        return Result.success(`The blogs with Topic:${exist.topic}`,blog);
    }

    public async getAuthorBlog(author_id:number){
        const blogs=await this.blogModel.findAll({
            where:{author_id}
        })
        if(blogs.length===0){
           throw new AppError("No Published blog for the Author",404);
        }
        return Result.success("Authors.Blog",blogs);
    }



    public async createBlog(req:Request,data:{
        title:string,
        topic_id:number,
        content:string,
        banner_img?:Buffer
    }){
        const exist=await Topic.findByPk(data.topic_id);
        console.log(exist);
        if(!exist){
            throw new AppError("Please Enter a valid Topic for the Blog",400);
        }

        const authorId=this.getAuthorId(req);
        const payload:any={
            author_id:authorId,
            title:data.title,
            topic_id:data.topic_id,
            content:data.content,
            status:BlogStatus.DRAFT
        }
        if(data.banner_img){
            payload.banner_img=data.banner_img;
        }
        console.log("service working");
        const blog=await this.blogModel.create(payload);

        return Result.success("Draft saved",blog);
    }

    public async submitBlog(req:Request,id:number){
        //const author_id=this.getAuthorId(req);
        // console.log(author_id);

        const blog=await this.blogModel.findByPk(id);

        if(!blog){
            throw new AppError("Blog Not Found",404);
        }
        // if(blog.author_id!==author_id){
        //    throw new AppError("Unauthorized",403);
        // }

        if(blog.status===BlogStatus.PUBLISHED){
           throw new AppError("Blog Is Already Published",400)
        }
        if(blog.status===BlogStatus.UNPUBLISHED){
            throw new AppError("Blog is already under Review request",400)
        }

        blog.status=BlogStatus.UNPUBLISHED;

        await blog.save();

        const request=await AdminRequest.create({
            blog_id:blog.id,
            author_id:blog.author_id
        });

        return Result.success("Blog Submitted for Approval",{
            blog,request
        })
    }

    public async editBlog(req:Request,data:{
        title?:string,
        topic_id?:number,
        content?:string,
        banner_img?:Buffer
    },id:number){
        //const authorId=this.getAuthorId(req);

        const blog=await this.blogModel.findByPk(id);

        if(!blog){
           throw new AppError("Blog Not Found",404);
        }
        // if(blog.author_id!==authorId){
        //     throw new AppError("Unauthorized Access",403);
        // }

        const isChanged: boolean =
            (data.title !== undefined && data.title !== blog.title) ||
            (data.topic_id !== undefined && data.topic_id !== blog.topic_id) ||
            (data.content !== undefined && data.content !== blog.content) ||
            (data.banner_img !== undefined && data.banner_img !== blog.banner_img);
        let newStatus:BlogStatus=blog.status;
        if(isChanged){
            if(blog.status==BlogStatus.UNPUBLISHED){
                newStatus=BlogStatus.UNPUBLISHED;
            }
            else{
                newStatus=BlogStatus.DRAFT;
            }
        
        await blog.update({
            title:data.title??blog.title,
            topic_id:data.topic_id??blog.topic_id,
            content:data.content??blog.content,
            banner_img:data.banner_img??blog.banner_img,
            status:newStatus
        })
        return Result.success(`Blog Updated Succesfully with status ${newStatus}`,blog)
        }

        return Result.success("No changes made")
    }

    public async deleteBlog(req:Request,id:number){
       // const authorId=this.getAuthorId(req);
       
        const blog=await this.blogModel.findByPk(id);

        // if(blog.author_id!==authorId){
        //    throw new AppError("Insufficient permissions to delete",403);
        // }

        const result=await this.blogModel.destroy({where:{id}});
        return Result.success("Blog Deleted")
       }
}