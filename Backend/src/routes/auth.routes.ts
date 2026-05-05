import { Router } from "express";
import { TokenVerify } from "../middlewares/verifyToken";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { User } from "../models/User";
import { Token } from "../models/Token";
import { AuthValidator } from "../validators/AuthValidator";
import { ValidateRequest } from "../middlewares/validateRequest";



export class AuthRoutes{
    public router:Router;
    private controller:AuthController;
    private token:TokenVerify;

    constructor(){
        this.router=Router();
        const authService=new AuthService(User,Token);
        this.controller=new AuthController(authService);
        this.token=new TokenVerify()

        this.initializeRoutes();
    }

    private initializeRoutes(){
        //signUp
        this.router.post("/signup",AuthValidator.signup(),ValidateRequest.handle,this.controller.signUp);
        //verify-otp
        this.router.post("/verify",AuthValidator.verify(),ValidateRequest.handle,this.controller.verifyOtp);
        //register
        this.router.post(
                "/register",this.token.verifyRegisterToken,AuthValidator.register(),ValidateRequest.handle,this.controller.registerUser
        );
        //login
        this.router.post("/login",AuthValidator.login(),ValidateRequest.handle,this.controller.login);
        //newAcessToken
        this.router.get("/newAccessToken",this.token.verifyRefreshToken,this.controller.newAToken);
        //logout
        this.router.post("/logout",this.token.verifyRefreshToken,this.controller.logoutUser);
        //forget-password
        this.router.post("/forget-password",AuthValidator.signup(),ValidateRequest.handle,this.controller.forgetPass);
        //reset-password
        this.router.post("/reset-password-link/:otp",AuthValidator.resetPass(),ValidateRequest.handle,this.controller.resetPassword);
    } 


}

const authRoutes=new AuthRoutes();

export default authRoutes.router;