import { Request,Response,NextFunction } from "express";
import { Responder } from "../utils/Responder";
import { AuthService } from "../service/auth.service";
import { UserResource } from "../resources/UserResource";
import { SuccessCode } from "../common/constants/successCode.Constant";
export class AuthController{
    private authService:AuthService;

    constructor(authService:AuthService){
        this.authService=authService
    }

    //Sign Up
    public signUp=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {email}=req.body;
            const result=await this.authService.signUp(email);

            return Responder.success(res,result,SuccessCode[100],200,100);
        }catch(error){
            next(error)
    }

    }
    
    //OTP verification
    public verifyOtp=async (req: Request, res: Response,next:NextFunction)=>{

        try{
            const result:any=await this.authService.otpVerification(req.body);
            
            return Responder.success(res,result,SuccessCode[101],201,101);
        }catch(error){
            next(error);
        }
    }
    
    //register
    public registerUser=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const tokenData=(req as any).user;
            console.log(req.body)
            console.log(tokenData);
            const result=await this.authService.registerUser(req.body,tokenData);
            return Responder.created(res,UserResource.toJSON(result),SuccessCode[102],201,102)

        }catch(error){
            next(error);
        }
    }

    //login 
    public login=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body);
            const result=await this.authService.login(req.body)
            console.log(result);
            return Responder.success(res,result,SuccessCode[103],200,103)
        }catch(error){
            next(error)
        }
    }

    //new Access Token
    public newAToken=async(req:Request,res:Response,next:NextFunction)=>{
        try{
          const decode:any=(req as any).refresh;
          const token=(req as any).refreshToken;
    
          const result=await this.authService.refreshToken(
            decode.id,
            token
          );
          return Responder.success(res,result,SuccessCode[107],200,107)
        }catch(error){
            next(error)
        }
    }    

    //logout user
    public logoutUser=async(req:Request,res:Response,next:NextFunction)=>{
       try{
         const decoded:any=(req as any).refresh;
         const token=(req as any).refreshToken;
    
         if(!decoded||!decoded.id){
           return res.status(401).json({
             message:"Invalid token payload "
           });
         }
    
         const result=await this.authService.logout(
           decoded.id,
           token
         );
    
         return Responder.success(res,result,SuccessCode[108],200,108);
    
       }
       catch(error){
            next(error);
       }
    
    }

    //forgot password
    public forgetPass=async(req:Request,res:Response,next:NextFunction)=>{

        try{
            const result=await this.authService.forgetPass(req.body);
            return Responder.success(res,result,SuccessCode[109],200,109)
        }

        catch(error:any){
            next(error)    
        }
    }

    //reset password
    public resetPassword=async(req:Request,res:Response,next:NextFunction)=>{
      try{
        const {otp}=req.params;
        const result=await this.authService.resetPassword(req.body,String(otp));
        return Responder.success(res,UserResource.toJSON(result),SuccessCode[106],200,106)
      }
      catch(error){
            next(error)
        }
    }
}