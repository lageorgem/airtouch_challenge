import {ObjectId} from "mongodb";
import {User, UserModel} from '../../models/User'
import HTTPError from "../../models/exceptions/HTTPError";
import {InstanceType} from "typegoose";

export class UserService {
    /**
     * Retrieves a User from the database based on id
     * @param id - the _id of the user
     * @returns Promise<ObjectId>
     */
    public static async getUserById(id: ObjectId): Promise<User> {

        return await UserModel.findOne({ _id: id })
        .then((result: InstanceType<User> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `User id ${id} was not found.`});
            }

            return result;
        });
    };
}
