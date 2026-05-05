import bcrypt from "bcrypt";
import crypto from "crypto"
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { EmailVerification } from "../models/EmailVerification";
import { mailService } from "../utils/mail.instance";
import { TokenUtil } from "../utils/token.Util";
import { ERROR_MESSAGE } from "../common/constants/errorCode.Constant";
import { UserRole } from "../common/enums/userRole.enum";
export class AuthService{
    private userModel:any;
    private tokenModel:any;

    constructor(userModel:any,tokenModel:any){
        this.userModel=userModel;
        this.tokenModel=tokenModel;
    }

    // SignUp
    public async signUp (email:string){
        const existingUser = await User.findOne({ where: { email } });
            
                if (existingUser?.isRegistered===true) {
                    throw new AppError(ERROR_MESSAGE[155],400,155);
                }
                const otp:string=Math.floor(100000 + Math.random() * 900000).toString();
                
        //if already otp exist for given email then update the previous entry 
                await EmailVerification.upsert({email,otp});
                const op=await mailService.sendMail(email,"One Time Password",`OTP:${otp}`);
                return{
                    msg:"Otp Sent Successfully",
                    op
                }

    }

    //verification of otp 
    public async otpVerification(data:any){
        
        const{ email,otp }=data;
        
        const ifExist=await User.findOne({where:{email}});

        if(ifExist && ifExist.isRegistered===true){
            throw new AppError(ERROR_MESSAGE[155],400,155);
        }

        const verification:any=await EmailVerification.findOne({where:{email}});
        
        if(!verification){
            throw new AppError(ERROR_MESSAGE[154],400,154);
        }
        
        //invalid OTP Check
        if(otp!==verification.otp){
           throw new AppError(ERROR_MESSAGE[156],400,156);
        }
        
        // already Existing User 
        const existingUSer=await User.findOne({where:{email}})
        if(existingUSer?.isRegistered){
           throw new AppError(ERROR_MESSAGE[155],400,155) 
        }
        
        let user=await User.findOne({where:{email}});

        if(!user){
           user= await User.create({
                email:verification.email
           })
        }
        
            const atoken=TokenUtil.generateAccessToken({
                id:user?.id,
                email:user.email
            })
        
            await EmailVerification.destroy({
                where:{
                    email:verification.email
                }
            })
        
            return{
                access_token:atoken
            }
            
    }

    //register Service or On-boarding 
    public async registerUser(data:any,tokendata:any){
        
        const { 
  email: dataEmail, 
  firstName, 
  lastName, 
  stage,
  password, 
  ph_no, 
  role 
} = data;
        const{id,email:tokenEmail}=tokendata;
        console.log(dataEmail);
        console.log(tokenEmail);
        if(dataEmail!==tokenEmail){
            throw new AppError(ERROR_MESSAGE[150],401,150);
        }
       
        const hashP=await bcrypt.hash(password,10); // encrypting the password befor storing 

        const user=await this.userModel.findByPk(id);

        if(!user){
            throw new AppError(ERROR_MESSAGE[154],400,154);
        }

        const role_val = (role as string).toUpperCase() as UserRole;
        const allowedRoles: UserRole[] = [UserRole.USER, UserRole.AUTHOR, UserRole.DOCTOR];

        if(!allowedRoles.includes(role_val)){
            throw new AppError(ERROR_MESSAGE[152], 400, 152);
        }

        user.set({
          firstName,
          lastName,
          stage:    stage    || null,
          password: hashP,
          ph_no,
          role:     role_val,
          isRegistered: true
        });
        await user.save();

        return user;
    }

   //login Service 
    public async login(data:any){
        const{email,password}=data;

        const user: any = await this.userModel.findOne({
              where: { email }
          });

        if(!user){
            throw new AppError(ERROR_MESSAGE[157],404,157);
        }

        //password verification
         const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new AppError(ERROR_MESSAGE[151],400,151);
          }
          
          const atoken=TokenUtil.generateAccessToken({
            id:user.id,
            email:user.email,
            role:user.role
          })
          const rtoken=TokenUtil.generateRefreshToken({
            id:user.id
          })
          await this.tokenModel.upsert({
            user_id:user.id,
            refresh_token:rtoken
          })
          const response={
            access_token:atoken,
            refresh_token:rtoken,
            user:{
              id:user.id,
              email:user.email,
              firstName:user.firstName,
              lastName:user.lastName,
              stage:user.stage,
              role:user.role
            }
          }
          return response;
    }

    // refresh token 
    public async refreshToken(userId:number,refreshToken:string){

        const stored=await this.tokenModel.findOne({
          where:{
            user_id:userId,
            refresh_token:refreshToken,
          }
        });

        if(!stored){
          throw new AppError(ERROR_MESSAGE[158],404,158);
        }
        const user:any=await this.userModel.findByPk(userId);
      

        const newAcessToken=TokenUtil.generateAccessToken({
          id:user.id,
          email:user.email,
          role:user.role
        })

        return newAcessToken;
      
    }

    //logout Service 
    public async logout(userId:number,refreshToken:string){
      
        const deleted=await this.tokenModel.destroy({
          where:{
            user_id:userId,
            refresh_token:refreshToken
          }
        });
        
        if(!deleted){
          throw new AppError(ERROR_MESSAGE[159],400,159);
        }

        return deleted;
    }

    //forget Password
    public async forgetPass(data:any){
        const {email}=data;
        const user=await this.userModel.findOne({
          where:{email}
        })
        if(!user){
          throw new AppError(ERROR_MESSAGE[157],404,157);
        }

         const otp = crypto.randomBytes(32).toString("hex");
            await EmailVerification.upsert({email,otp});
          const reset_link=`${process.env.LOCALHOST_LINK}/reset-password-link/${otp}`;

        const op=await mailService.sendMail(email,"Link to RESET PASSWORD",
            `Please click the following link to reset your password \n ${reset_link}`
        );

        return {
            op
        };
      }

    // reset password
      public async resetPassword(data:any,otp:string){
        
        const{newPassword}=data;
        const record:any=await EmailVerification.findOne({where:{otp}});
        
        if(!record){
          throw new AppError(ERROR_MESSAGE[158],400,158);
        }

        const email=record.email
        const user:any=await this.userModel.findOne({where:{email}})
        //once the otp is verified its deleted from the db
        await EmailVerification.destroy({where:{otp}});
        
        if(!user){
         throw new AppError(ERROR_MESSAGE[157],400,157);
        }

        const hash=await bcrypt.hash(newPassword,10);
        user.password=hash;
        await user.save();
        return user;
      }

}