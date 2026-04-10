import { Response } from "express";
import { ApiResponse } from "./ApiResponse";

export class Responder{

    static success<T>(
        res:Response,
        data:T,
        message="Success",
        statusCode=200,
        custom_StatusCode?:number|undefined
    ){
        return res.status(statusCode).json(
            new ApiResponse(true,message,data,custom_StatusCode)
        );
    }

    static created<T>(
        res:Response,
        data:T,
        message="Created successfully",
        statusCode=201,
        custom_StatusCode?:number|undefined
    ){
        return res.status(statusCode).json(
            new ApiResponse(true,message,data,custom_StatusCode)
        )
    }

    static error(
        res:Response,
        message="Something went wrong",
        statusCode=500,
        custom_StatusCode?:number|undefined
    ){

        return res.status(statusCode).json(
            new ApiResponse(false,message,undefined,custom_StatusCode)
        );
    }
}


// in this file i created all the function as static as we will be using this as frequently api responses and will not want to create an Object instance over and over again , thus these functions are made static 