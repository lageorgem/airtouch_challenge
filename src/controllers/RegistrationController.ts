/**
 * @module Registration
 */

import { Request, Response, Router } from "express";
import { RegistrationService } from "../services/RegistrationService";
import { ObjectId } from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import JWTGenerationService from "../services/authentication/JWTGenerationService";
import { User } from "../models/User";

/**
 * Instance of the Express Router
 */
const router: Router = Router();

/**
 * Route POST /register/
 */
router.post("/", (req: Request, res: Response): void => {
    const payload: User = req.body;

    RegistrationService.register(payload)
    .then((id: ObjectId) => {
        return JWTGenerationService.generate(id.toHexString())
        .then((token: string) => {
            res.status(201)
            .header("Location", `users/${id.toHexString()}`)
            .send({
                token: token
            });
        });
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

export const RegistrationController: Router = router;
