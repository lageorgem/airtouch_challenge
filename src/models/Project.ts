/**
 * @module Project
 */

import { ObjectId } from "bson";
import { prop, Typegoose } from "typegoose";
import MongooseService from "../services/MongooseService";
import { Model } from "./index";

/**
 * Object mapping of a Project document
 */
export class Project extends Typegoose {

    public _id: ObjectId | string | null = null;

    /**
     * [Required] The name of the project.
     */
    @prop({ required: true })
    public name: string;

    /**
     * [Required] The company maintaining the project
     */
    @prop({ required: true })
    public company: string;
}

/**
 * Typegoose model for database interaction
 */
export const ProjectModel: Model<Project> = new Project().getModelForClass(Project, {
    existingConnection: MongooseService.getInstance().getClient(),
    schemaOptions: { collection: "Projects", versionKey: false }
});
