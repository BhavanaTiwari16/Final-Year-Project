import { AppError } from "./AppError";

export class Result {
    static success(message: string, data?: any) {
        return { message, data };
    }

    static fail(message: string, statusCode: string | number): AppError {
        return new AppError(message, Number(statusCode));
    }
}
