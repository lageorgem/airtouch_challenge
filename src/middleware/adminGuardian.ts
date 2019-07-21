/**
 * @module Authorization
 */

import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";
import { AccessRole } from "../models/Role";


/**
 * Middleware for guarding against unauthorized access to admin endpoints
 * @param req Express request object
 * @param res Express response object
 * @param next next middleware
 */
export const adminGuardian: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const user: User & { role: AccessRole; } = req.user;

    if (user.role !== AccessRole.AdministratorRole) {
        res.status(401)
        .send({ error: "You do not have the required privileges to view this resource." });
        return;
    }

    next();

};
