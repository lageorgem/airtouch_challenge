import {Request, Response, Router} from "express";
import {RegistrationService} from "../services/registration/RegistrationService";
import {ObjectId} from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import JWTGenerationService from "../services/authentication/JWTGenerationService";

const router: Router = Router();

/**
 * Route POST /register/
 */
router.post('/',  (req: Request, res: Response): void => {
    let payload = req.body;

    RegistrationService.register(payload)
    .then((id: ObjectId) => {
        const token = JWTGenerationService.generate(id.toHexString());

        res.status(201)
        .header("Location", `${req.protocol}://${req.get('host')}/user/${id.toHexString()}`)
        .send({
            token: token
        });
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});

export const RegistrationController: Router = router;
