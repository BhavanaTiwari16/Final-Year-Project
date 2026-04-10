//Global Exception Error Handler


import { Request,Response,NextFunction } from "express";
import {ValidationError } from "sequelize"; // if i have applied validation at Model level and tehy are violated
import { AppError } from "../utils/AppError";
import { Responder } from "../utils/Responder";
export class ErrorHandler{
    public static handle(err:any,req:Request,res:Response,next:NextFunction){
        console.log(err);

        if(err instanceof ValidationError){
            return Responder.error(res,err.message,
                400
            )
        }

        if(err.name==="JsonWebTokenError"){
            return Responder.error(res, "Invalid Token", 401);
   
        }

        if (err.name === "TokenExpiredError") {
            return Responder.error(res, "Token expired", 401);
        }

        if (err instanceof AppError) {
            return Responder.error(
                res,
                err.message,
                err.statusCode,
                err.customStatusCode
            );
        }

        return Responder.error(
            res,
            err.message,
            err.statusCode,
            err.customStatusCode
        );
    }
}
