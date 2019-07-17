import {User, UserModel} from '../../models/User'
import HTTPError from "../../models/exceptions/HTTPError";
import {ObjectId} from "bson";
import {InstanceType} from "typegoose";
import {Error} from "mongoose";
import * as bcrypt from "bcrypt";

export class RegistrationService {
    /**
     * Register a new User to the message board
     * @param user - the User object
     * @returns Promise<ObjectId>
     */
    public static async register(user: User): Promise<ObjectId> {

        return await UserModel.findOne({ $or: [ { username: user.username }, { email: user.email } ] })
        .then((result: InstanceType<User> | null) => {
            if (result) {
                throw new HTTPError(403, { error: "Username is already taken"});
            }

            let userModel = new UserModel();
            Object.assign(userModel, user);

            // validate the input
            let validation: Error.ValidationError = <Error.ValidationError> userModel.validateSync();

            if (validation && validation.errors) {
                let errors = Object.entries(validation.errors).map((kv: any) => {
                    let [k, v] = kv;

                    return v.message;
                });

                throw new HTTPError(400, { error: errors })
            }

            // hash the password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);

            Object.assign(userModel, { password: hash });

            return userModel.save();
        })
        .then((user: User): ObjectId => {
            if (user !== null) {
                return <ObjectId> user._id;
            }

            throw new HTTPError(500, "An error occured while registering.");
        });
    };
}
