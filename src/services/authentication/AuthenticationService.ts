import {User, UserModel} from "../../models/User";
import {ObjectId} from "bson";
import HTTPError from "../../models/exceptions/HTTPError";
import * as bcrypt from 'bcrypt';
import {InstanceType} from "typegoose";


export class AuthenticationService {
    /**
     * Authenticate with a username and a password
     * @param username - the username of the user seeking authentication
     * @param password - the password of the user seeking authentication
     * @throws HTTPError
     * @returns Promise<ObjectId>
     */
    public static async authenticate(username: string, password: string): Promise<ObjectId> {

        return await UserModel.findOne({ username: username })
        .then((result: InstanceType<User> | null) => {
            if (!result) {
                throw new HTTPError(401, { error: "Username or password is incorrect."});
            }

            return result;
        })
        .then(async (result: InstanceType<User>): Promise<ObjectId> => {
                const isPasswordCorrect: boolean = await bcrypt.compare(password, result.password);

            if (!isPasswordCorrect) {
                throw new HTTPError(401, { error: "Username or password is incorrect."});
            }

            return result._id;
        });
    };
}
