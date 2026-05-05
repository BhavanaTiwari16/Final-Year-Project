import { Request, Response, NextFunction } from "express";
import { BlogService } from "../service/blog.service";
import { Responder } from "../utils/Responder";

export class BlogController {
    private blogService: BlogService;

    constructor(blogService: BlogService) {
        this.blogService = blogService;
    }

    public getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.getAllBlog();
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public getBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.getBlog(Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public getAuthorBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.getAuthorBlog(Number(req.params.author_id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public getTopicBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.getTopicBlog(Number(req.params.topic_id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public createBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.createBlog(req, req.body);
            return Responder.created(res, result.data, result.message, 201);
        } catch (error) { next(error); }
    };

    public submitBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.submitBlog(req, Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public editBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.editBlog(req, req.body, Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.blogService.deleteBlog(req, Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };
}
