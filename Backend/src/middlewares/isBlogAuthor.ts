import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export class IsAuthor {
    private blogModel: any;

    constructor(blogModel: any) {
        this.blogModel = blogModel;
    }

    public isAuthor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            const blog = await this.blogModel.findByPk(req.params.id);

            if (!blog) return next(new AppError("Blog not found", 404));
            if (blog.author_id !== user.id) return next(new AppError("Forbidden: you are not the author", 403));

            next();
        } catch (error) {
            next(error);
        }
    };
}
