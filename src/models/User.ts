/**
 * @module User
 */

import { ObjectId } from "bson";
import { prop, Typegoose } from "typegoose";
import MongooseService from "../services/MongooseService";
import { Model } from "./index";

/**
 * Object mapping of a User document
 */
export class User extends Typegoose {

    public _id: ObjectId | string | null = null;

    /**
     * [Required] The user's alias
     */
    @prop({ required: true })
    public username: string;

    /**
     * [Required] The user's password
     */
    @prop({ required: true })
    public password: string;

    /**
     * [Required] The user's first name
     */
    @prop({ required: true })
    public firstName: string;

    /**
     * [Required] The user's last name
     */
    @prop({ required: true })
    public lastName: string;

    /**
     * [Required] The user's email address
     */
    @prop({ required: true, validate: /\S+@\S+\.\S+/ })
    public email: string;
}

/**
 * Typegoose model for database interaction
 */
export const UserModel: Model<User> = new User().getModelForClass(User, {
    existingConnection: MongooseService.getInstance().getClient(),
    schemaOptions: { collection: 'Users', versionKey: false }
});
