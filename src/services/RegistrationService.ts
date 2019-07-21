/**
 * @module Registration
 */

import { User, UserModel } from "../models/User"
import HTTPError from "../models/exceptions/HTTPError";
import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { Error } from "mongoose";
import * as bcrypt from "bcrypt";
import { RoleService } from "./RoleService";
import { AccessRole, Role } from "../models/Role";

/**
 * Service class for user registration
 */
export class RegistrationService {
    /**
     * Register a new [[User]]
     * @param user - the [[User]] object
     * @returns Promise<ObjectId>
     */
    public static async register(user: User): Promise<ObjectId> {

        return UserModel.findOne({ $or: [{ username: user.username }, { email: user.email }] })
        .then((result: InstanceType<User> | null) => {
            if (result) {
                throw new HTTPError(403, { error: "Username or email already taken" });
            }

            const userModel: InstanceType<User> = new UserModel();
            Object.assign(userModel, user);

            // Validate the input
            const validation: Error.ValidationError = userModel.validateSync() as Error.ValidationError;

            if (validation && validation.errors) {
                throw new HTTPError(400, { error: validation.errors })
            }

            // Hash the password
            return bcrypt.genSalt(10)
            .then((salt: string) => {
                return bcrypt.hash(user.password, salt);
            })
            .then((hash: string) => {
                Object.assign(userModel, { password: hash });
                return userModel.save();
            });
        })
        .then((user: User): Promise<ObjectId> => {
            // Handle case where user was not created
            if (user == null) {
                throw new HTTPError(500, { error: "An error occured while registering." });
            }

            // Assign the new user a default role
            const powerlessRole: Role = {
                userId: user._id,
                role: AccessRole.PowerlessRole
            } as Role;

            return RoleService.addRole(powerlessRole)
            .then(() => {
                return user._id as ObjectId;
            })
            .catch((err: Error) => {
                throw new HTTPError(500, { error: `An error occured while registering: ${JSON.stringify(err)}` });
            });
        });
    };
}
