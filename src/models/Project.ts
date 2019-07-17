import {ObjectId} from 'bson';
import {prop, Typegoose} from "typegoose";
import MongooseService from "../services/mongoose/MongooseService";

export class Project extends Typegoose {

    _id: ObjectId | null = null;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    company: string;
}

export const ProjectModel = new Project().getModelForClass(Project, {
    existingConnection: MongooseService.getInstance().getClient(),
    schemaOptions: { collection: 'Project', versionKey: false }
});
