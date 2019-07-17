import {Request, Response, Router} from "express";
import {Project} from "../models/Project";
import {ProjectService} from "../services/project/ProjectService";
import {ObjectId} from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import {adminRoleGuardian} from "../middleware/adminRoleGuardian";

const router: Router = Router();

/**
 * Route POST /project/
 * @middleware
 */
router.post('/', adminRoleGuardian, (req: Request, res: Response): void => {
    let payload: Project = req.body;

    ProjectService.addProject(payload)
    .then((result: ObjectId) => {
        res.status(201)
        .header("Location", `project/${result.toHexString()}`)
        .end();
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

/**
 * Route GET /project/:id
 * @middleware
 */
router.get('/:id',  (req: Request, res: Response): void => {
    let id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(400)
        .send({ error: "The message id provided is not a valid BSON id."});
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
