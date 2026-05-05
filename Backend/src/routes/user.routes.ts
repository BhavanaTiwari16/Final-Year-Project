import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { RoleMiddleware } from "../middlewares/authorization.middleware";
import { TokenVerify } from "../middlewares/verifyToken";
import { UserService } from "../service/user.service";

export class UserRoutes {

    public router: Router;
    private controller: UserController;
    private token: TokenVerify;
    private role: RoleMiddleware;

    constructor() {

        this.router = Router();

        const userService = new UserService();
        this.controller = new UserController(userService);

        this.token = new TokenVerify();
        this.role = new RoleMiddleware();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        // get user profile
        this.router.get(
            "/:id",
            this.token.verifyRegisterToken,
            this.controller.profile
        );
        //get user blogs 
        this.router.delete(
            "/:id",this.token.verifyRegisterToken,this.controller.deleteProfile);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;