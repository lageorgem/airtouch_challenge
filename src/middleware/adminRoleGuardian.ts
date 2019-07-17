import {NextFunction, Request, RequestHandler, Response} from "express";

/**
 * Middleware for checking for admin roles
 * @param req
 * @param res
 * @param next
 */
export const adminRoleGuardian: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log(JSON.stringify(req));

    next();
};
