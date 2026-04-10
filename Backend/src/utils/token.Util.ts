import jwt from "jsonwebtoken";
import { UserRole } from "../common/enums/userRole.enum";
const ACCESS_SECRET=process.env.JWT_SECRET as string;
const REFRESH_SECRET=process.env.JWT_RSECRET as string;

interface TokenPayload{
    id:number;
    email?:string;
    role?:UserRole;
}

export class TokenUtil{
    static generateAccessToken(payload:TokenPayload){
        return jwt.sign(payload,ACCESS_SECRET,{
            expiresIn:"15m"
        });
    }

    static generateRefreshToken(payload:TokenPayload){
        return jwt.sign(payload,REFRESH_SECRET,{
            expiresIn:"1d"
        });
    }
    static verifyAccessToken(token:string){
        return jwt.verify(token,ACCESS_SECRET);
    }
    static verifyRefreshToken(token:string){
        return jwt.verify(token,REFRESH_SECRET);
    }

}