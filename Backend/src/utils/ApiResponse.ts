export class ApiResponse<T>{
    public success:boolean;
    public message:string;
    public data?:T;//creating it with generic type template datatype making it more type safe as compared to any 
    public custom_statusCode?:number|string;
    constructor(success:boolean,message:string,data?:T,custom_statusCode?:number|string){
        this.success=success;
        this.message=message;
        if(data!==undefined){
            this.data=data;
        }
        if(custom_statusCode!==undefined){
            this.custom_statusCode=custom_statusCode
        }
    }

}