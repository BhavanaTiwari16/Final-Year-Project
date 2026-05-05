import { Router } from "express";
import { Blog } from "../models/Blog";
import { BlogController } from "../controllers/blog.controller";
import { BlogService } from "../service/blog.service";
import { RoleMiddleware } from "../middlewares/authorization.middleware";
import { TokenVerify } from "../middlewares/verifyToken";
import { UserRole } from "../common/enums/userRole.enum";
import { IsAuthor } from "../middlewares/isBlogAuthor";
export class BlogRoutes {

    public router: Router;
    private controller: BlogController;
    private token: TokenVerify;
    private role: RoleMiddleware;
    private isOwner:IsAuthor;
    constructor() {

        this.router = Router();

        const blogService = new BlogService(Blog);
        this.controller = new BlogController(blogService);
        
        this.token = new TokenVerify();
        this.role = new RoleMiddleware();
        this.isOwner=new IsAuthor(Blog);

        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.get("/", this.controller.getAllBlog);
        
        //creating blog route
        this.router.post(
            "/",
            this.token.verifyRegisterToken,
            this.role.authorize([UserRole.AUTHOR]),
            this.controller.createBlog
        );
        // submitting for admin approval 
        this.router.patch(
            "/:id/submit",
            this.token.verifyRegisterToken,
            this.role.authorize([UserRole.AUTHOR]),
            this.isOwner.isAuthor,
            this.controller.submitBlog
        );

        //bogs by author
        this.router.get("/author/:author_id", this.controller.getAuthorBlog);

        //blogs by topic 
        this.router.get("/topic/:topic_id", this.controller.getTopicBlog);

        //blogs by their id 
        this.router.get("/:id", this.controller.getBlog);

        //edit blog 
        this.router.patch(
            "/:id",
            this.token.verifyRegisterToken,
            this.role.authorize([UserRole.AUTHOR]),
            this.isOwner.isAuthor,
            this.controller.editBlog
        );

        this.router.delete(
            "/:id",
            this.token.verifyRegisterToken,
            this.role.authorize([UserRole.AUTHOR]),
            this.isOwner.isAuthor,
            this.controller.deleteBlog
        );
    }
}

const blogRoutes = new BlogRoutes();
export default blogRoutes.router;