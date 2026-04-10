import { Request, Response, NextFunction } from "express";
import { TokenUtil } from "../utils/token.Util";
import { AppError } from "../utils/AppError";
export class TokenVerify{

  public verifyRegisterToken(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return next(new AppError("Token Required", 401));
      }
  
      const token = String(authHeader.split(" ")[1]);
  
      
      const decoded: any = TokenUtil.verifyAccessToken(token);
      console.log(decoded);
      (req as any).user = decoded;
  
      next();
  
    } catch (error) {
      next(error);
    }
  };

  public verifyRefreshToken(
    req:Request,
    res:Response,
    next:NextFunction
  ){
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return next(new AppError("Token Required", 401));
      }
  
      const token = String(authHeader.split(" ")[1]);
  
      const decoded: any = TokenUtil.verifyRefreshToken(token);
  
      
      (req as any).refresh = decoded;
      (req as any).refreshToken = token;
  
      next();
  
    } catch (error) {
        next(error);
    }
  }
}

