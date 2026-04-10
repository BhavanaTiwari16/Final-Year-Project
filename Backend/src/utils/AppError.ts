//Custom Exception Error Handler 

export class AppError extends Error{
    public statusCode:number;
    public status:string;
    public customStatusCode?:number|undefined;
    constructor(message:string,statusCode:number,customStatusCode?:number){
        super(message); //passing to the parent class Error
        this.statusCode=statusCode;
        this.status=statusCode>=400 && statusCode<500?"fail":"error";
        this.customStatusCode=customStatusCode;
        Error.captureStackTrace(this,this.constructor);
        //To identify excact file location of error 

    }
}