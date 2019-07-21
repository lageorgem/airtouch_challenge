/**
 * @module Role
 */

import { ObjectId } from "bson";
import { prop, Typegoose } from "typegoose";
import MongooseService from "../services/MongooseService";
import { Model } from "./index";


/**
 * Available access roles
 */
export enum AccessRole {
    PowerlessRole,
    AdministratorRole
}

/**
 * Object mapping of a Role document
 */
export class Role extends Typegoose {

    public _id: ObjectId | string | null = null;

    /**
     * [Required] The id of the user associated with this role
     */
    @prop({ required: true })
    public userId: string | ObjectId;

    /**
     * [Required] The assigned role. Defaults to `[[AccessRole]].PowerlessRole`
     */
    @prop({ required: true, default: AccessRole.PowerlessRole })
    public role: AccessRole;
}

/**
 * Typegoose model for database interaction
 */
export const RoleModel: Model<Role> = new Role().getModelForClass(Role, {
    existingConnection: MongooseService.getInstance().getClient(),
    schemaOptions: { collection: "Roles", versionKey: false }
});
