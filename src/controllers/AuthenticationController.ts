import {Request, Response, Router} from "express";
import {ObjectId} from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import JWTGenerationService from "../services/authentication/JWTGenerationService";
import {AuthenticationService} from "../services/authentication/AuthenticationService";

const router: Router = Router();

/**
 * Route POST /login/
 */
router.post('/',  (req: Request, res: Response): void => {
    let payload = req.body;
    if (!payload.username || !payload.password) {
        res.status(400)
        .send({ error: "The payload is not a valid representation of credentials."});
    }

    AuthenticationService.authenticate(payload.username, payload.password)
    .then((id: ObjectId) => {
        const token = JWTGenerationService.generate(id.toHexString());

        res.status(200)
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

export const AuthenticationController: Router = router;
