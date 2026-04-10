export class UserResource{
    static toJSON(user:any){
       return {
           id:user.id,
           email:user.email,
           name:user.name,
           role:user.role,
           isRegistered:user.isRegistered
        }

    }
}