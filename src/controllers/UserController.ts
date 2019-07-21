/**
 * @module User
 */

import { Request, Response, Router } from "express";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { ObjectId } from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import { adminGuardian } from "../middleware/adminGuardian";

/**
 * Instance of the Express Router
 */
const router: Router = Router();

/**
 * Route GET /users/me
 */
router.get("/me", (req: Request, res: Response): void => {
    res.status(200)
    .send(req.user);
});

/**
 * Route GET /users/:id
 */
router.get("/:id", adminGuardian, (req: Request, res: Response): void => {
    const id: string = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400)
        .send({ error: "The user id provided is not a valid BSON id." });
    }

    UserService.getUser(ObjectId.createFromHexString(id))
    .then((result: User) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    });

});

/**
 * Route GET /users/
 */
router.get("/", adminGuardian, (req: Request, res: Response): void => {
    UserService.getUsers()
    .then((result: Array<User>) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    });

});

export const UserController: Router = router;
