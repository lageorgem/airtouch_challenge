/**
 * @module Project
 */

import { Request, Response, Router } from "express";
import { Project } from "../models/Project";
import { ProjectService } from "../services/ProjectService";
import { ObjectId } from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import { adminGuardian } from "../middleware/adminGuardian";
import passport from "../middleware/userGuardian";

/**
 * Instance of the Express Router
 */
const router: Router = Router();

/**
 * Route POST /projects/
 */
router.post("/", passport.authenticate("jwt", { session: false }), adminGuardian, (req: Request, res: Response): void => {
    const payload: Project = req.body;

    ProjectService.addProject(payload)
    .then((result: ObjectId) => {
        res.status(201)
        .header("Location", `projects/${result.toHexString()}`)
        .end();
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

/**
 * Route GET /projects/
 */
router.get("/", (req: Request, res: Response): void => {
    ProjectService.getProjects()
    .then((result: Array<Project>) => {
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
 * Route GET /projects/:id
 */
router.get("/:id", (req: Request, res: Response): void => {
    const id: string = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400)
        .send({ error: "The message id provided is not a valid BSON id." });
    }

    ProjectService.getProject(ObjectId.createFromHexString(id))
    .then((result: Project) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

export const ProjectController: Router = router;
