import { Router } from "express";
import { RoleMiddleware } from "../middlewares/authorization.middleware";
import { TokenVerify } from "../middlewares/verifyToken";
import { UserRole } from "../common/enums/userRole.enum";
import { TopicController } from "../controllers/topic.controller";
import { TopicService } from "../service/topic.service";
import { Topic } from "../models/Topic";

export class TopicRoutes {

    public router: Router;
    private controller: TopicController;
    private token: TokenVerify;
    private role: RoleMiddleware;

    constructor() {

        this.router = Router();

        const topicService = new TopicService(Topic);
        this.controller = new TopicController(topicService);

        this.token = new TokenVerify();
        this.role = new RoleMiddleware();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {

        this.router.get("/", this.controller.getAllTopic);

        this.router.get("/:id", this.controller.getTopic);

        this.router.post(
            "/",
            this.token.verifyRegisterToken,
            this.role.authorize([UserRole.AUTHOR]),
            this.controller.createTopic
        );
    }
}

const topicRoutes = new TopicRoutes();
export default topicRoutes.router;