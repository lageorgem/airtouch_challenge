import {ObjectId} from 'bson';
import {prop, Typegoose} from "typegoose";
import MongooseService from "../services/mongoose/MongooseService";

export class User extends Typegoose {

    _id: ObjectId | null = null;

    @prop({ required: true })
    username: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    email: string;
}

export const UserModel = new User().getModelForClass(User, {
    existingConnection: MongooseService.getInstance().getClient(),
    schemaOptions: { collection: 'Users', versionKey: false }
});
