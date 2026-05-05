import { Request } from "express";
import { Topic } from "../models/Topic";
import { Blog } from "../models/Blog";
import { User } from "../models/User";
import { AdminRequest } from "../models/AdminRequest";
import { BlogStatus } from "../common/enums/blogStatus.enum";
import { ReqStatus } from "../common/enums/reqStatus.enum";
import { Result } from "../utils/responder";
import { AppError } from "../utils/AppError";

export class UserService{
  
      private getUserId(req:Request):any{
        const user=(req as any).user;
        return user.id
    }
  
  async getUserById(req:Request,id:number){
            const userId=this.getUserId(req);
            const user = await User.findByPk(id, {
              attributes: ["id", "firstName", "lastName", "email"],
              include:[{
                model:Blog,
                attributes:["id","topic_id","title","content","banner_img","status"]
              },
            {
              model: User,
              as: "Subscribed_Authors",
              attributes:["id","firstName","lastName"],
              through: { attributes: [] }
            },
           ]
          });
          
            if (!user) {
              throw new AppError("User not found",404);
            }
            if(userId!==user.id){
              throw new AppError("Unauthiorized",403);
            }
          
            return user;
    };
  



  async deleteProfile(req:Request,id:number){
    const user_id=this.getUserId(req);
    const user=await User.findByPk(id);

    if(user_id!==id){
      throw Result.fail("Unauthorized Access","403");
    }
    if (!user) {
        throw Result.fail("User not found","404");
    }
    if(user_id!==user.id){
      throw Result.fail("Unauthorized access","403");
    }
    await user.destroy();

    return Result.success("User Deleted Successfully");
  }

        
}