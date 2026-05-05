import { Request, Response, NextFunction } from "express";
import { UserRole } from "../common/enums/userRole.enum";
import { AppError } from "../utils/AppError";

export class RoleMiddleware {
    public authorize(roles: UserRole[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = (req as any).user;
            if (!user || !roles.includes(user.role)) {
                return next(new AppError("Forbidden: insufficient permissions", 403));
            }
            next();
        };
    }
}
