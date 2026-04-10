import { Request,Response,NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError";

export class ValidateRequest {
  public static handle(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array({ onlyFirstError: true }).map((e: any) => ({
        field: e.param, // safer than path
        message: e.msg
      }));

      return res.status(400).json({
        status: "fail",
        errors: formattedErrors
      });
    }

    next();
  }
}