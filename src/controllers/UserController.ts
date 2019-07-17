import {Request, Response, Router} from "express";
import {User} from "../models/User";
import {UserService} from "../services/user/UserService";
import {ObjectId} from "bson";
import HTTPError from "../models/exceptions/HTTPError";
import {adminRoleGuardian} from "../middleware/adminRoleGuardian";

const router: Router = Router();

/**
 * Route GET /user/me
 */
router.get("/me",  (req: Request, res: Response): void => {
    const user: User = Object.assign({}, req.user); // Copy user object
    delete user.password; // Remove password

    res.status(200)
    .send(user);
});

/**
 * Route GET /user/:id
 */
router.get('/:id', adminRoleGuardian, (req: Request, res: Response): void => {
    let id: string = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400)
        .send({ error: "The user id provided is not a valid BSON id." });
    }


    UserService.getUserById(ObjectId.createFromHexString(id))
    .then((result: User) => {
        res.status(200)
        .send(result);
    })
    .catch((e: HTTPError) => {
        res.status(e.statusCode)
        .header(e.headers)
        .send(e.body)
    })

});



export const UserController: Router = router;
