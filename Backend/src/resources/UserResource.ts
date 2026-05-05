export class UserResource{
    static toJSON(user:any){
       return {
           id:user.id,
           email:user.email,
           firstName:user.firstName,
           lastName:user.lastName,
           stage:user.stage,
           role:user.role,
           isRegistered:user.isRegistered
        }

    }
}