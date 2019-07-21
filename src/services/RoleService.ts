/**
 * @module Role
 */

import HTTPError from "../models/exceptions/HTTPError";
import { InstanceType } from "typegoose";
import { Role, RoleModel } from "../models/Role";
import { ObjectId } from "bson";
import { Error } from "mongoose";

/**
 * Service class for manipulating [[Role]]s
 */
export class RoleService {

    /**
     * Retrieve the role for a given user ID
     * @param userId - the [[User]]'s ID
     * @returns Promise<[[Role]]>
     */
    public static async getRole(userId: string | ObjectId): Promise<Role> {
        if (typeof userId === "string") {
            userId = ObjectId.createFromHexString(userId);
        }

        return await RoleModel.findOne({ userId })
        .then((result: InstanceType<Role> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `No roles were found for user ${userId}.` });
            }

            return result;
        });
    };

    /**
     * Update a role for a given user ID
     * @param userId - the [[User]]'s ID
     * @param payload - the [[Role]] object
     * @returns Promise<[[Role]]>
     */
    public static async updateRole(userId: string | ObjectId, payload: Role): Promise<Role> {
        if (typeof userId === "string") {
            userId = ObjectId.createFromHexString(userId);
        }

        return RoleModel.findOneAndUpdate({ userId }, { $set: payload }, {
            new: true,
            runValidators: true
        })
        .then((result: InstanceType<Role> | null): Role => {
            if (result === null) {
                throw new HTTPError(404, `Role for user id ${userId} does not exist.`);
            }

            return result;
        });
    };

    /**
     * Add a new role
     * @param payload - the [[Role]] object
     * @returns Promise<ObjectId>
     */
    public static addRole(payload: Role): Promise<ObjectId> {
        if (typeof payload._id === "string") {
            Object.assign(payload, { _id: ObjectId.createFromHexString(payload._id) })
        }

        return new RoleModel(payload).save()
        .then((role: InstanceType<Role>): ObjectId => {
            return role._id;
        })
        .catch((error: Error.ValidationError) => {

            throw new HTTPError(400, { error });
        });
    };
}
