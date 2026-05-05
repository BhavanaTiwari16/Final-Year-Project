import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
import { Responder } from "../utils/Responder";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public profile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getUserById(req, Number(req.params.id));
            return Responder.success(res, user, "User Profile", 200);
        } catch (error) { next(error); }
    };

    public deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.deleteProfile(req, Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };
}
