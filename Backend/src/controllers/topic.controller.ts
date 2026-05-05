import { Request, Response, NextFunction } from "express";
import { TopicService } from "../service/topic.service";
import { Responder } from "../utils/Responder";

export class TopicController {
    private topicService: TopicService;

    constructor(topicService: TopicService) {
        this.topicService = topicService;
    }

    public getAllTopic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.topicService.getAllTopic();
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public getTopic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.topicService.getTopic(Number(req.params.id));
            return Responder.success(res, result.data, result.message, 200);
        } catch (error) { next(error); }
    };

    public createTopic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.topicService.createTopic(req, req.body.topic);
            return Responder.created(res, result.data, result.message, 201);
        } catch (error) { next(error); }
    };
}
