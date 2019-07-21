/**
 * @module Role
 */

import { Request, Response, Router } from "express";
import { RoleService } from "../services/RoleService";
import HTTPError from "../models/exceptions/HTTPError";
import { ObjectId } from "bson";
import { Role } from "../models/Role";

/**
 * Instance of the Express Router
 */
const router: Router = Router();

/**
 * Route POST /roles/
 */
router.post("/", (req: Request, res: Response): void => {
    const payload: Role = req.body;

    RoleService.addRole(payload)
    .then((result: ObjectId) => {
        res.status(201)
        .header("Location", `roles/${result.toHexString()}`)
        .end();
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    });

});

/**
 * Route PUT /roles/:id
 */
router.put("/:userId", (req: Request, res: Response): void => {
    const userId: string = req.params.userId;
    const payload: Role = req.body;

    if (!ObjectId.isValid(userId)) {
        res.status(400)
        .send({ error: "The user id provided is not a valid BSON id." });
    }

    RoleService.updateRole(userId, payload)
    .then((result: Role) => {
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
 * Route GET /roles/:userId
 */
router.get("/:userId", (req: Request, res: Response): void => {
    const userId: string = req.params.userId;

    if (!ObjectId.isValid(userId)) {
        res.status(400)
        .send({ error: "The user id provided is not a valid BSON id." });
    }

    RoleService.getRole(ObjectId.createFromHexString(userId))
    .then((result: Role) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    });

});

export const RoleController: Router = router;
