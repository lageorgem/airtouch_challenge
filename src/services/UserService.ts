/**
 * @module User
 */

import { ObjectId } from "mongodb";
import { User, UserModel } from "../models/User"
import HTTPError from "../models/exceptions/HTTPError";
import { InstanceType } from "typegoose";

/**
 * Service class for manipulating [[User]]s
 */
export class UserService {
    /**
     * Retrieve a User given the user ID
     * @param id - the [[User]] ID
     * @returns Promise<ObjectId>
     */
    public static async getUser(id: ObjectId): Promise<User> {

        return await UserModel.findOne({ _id: id }, { password: 0 })
        .then((result: InstanceType<User> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `User id ${id} was not found.` });
            }

            return result;
        });
    };

    /**
     * Retrieves all [[User]]s
     * @returns Promise<Array<[[User]]>>
     */
    public static async getUsers(): Promise<Array<User>> {

        return await UserModel.find({}, { password: 0 })
        .then((result: Array<InstanceType<User>>) => {
            if (!result) {
                throw new HTTPError(404, { error: `No users found.` });
            }

            return result;
        });
    };
}
