/**
 * @module Project
 */

import { ObjectId } from "mongodb";
import { Project, ProjectModel } from "../models/Project"
import HTTPError from "../models/exceptions/HTTPError";
import { InstanceType } from "typegoose";
import { Error } from "mongoose";

/**
 * Service class for manipulating [[Project]]s
 */
export class ProjectService {

    /**
     * Retrieves a Project from the collection based on ID.
     * @param id - the _id of the [[Project]]
     * @returns Promise<[[Project]]>
     */
    public static async getProject(id: ObjectId): Promise<Project> {

        return await ProjectModel.findOne({ _id: id })
        .then((result: InstanceType<Project> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `Project id ${id} was not found.` });
            }

            return result;
        });
    };

    /**
     * Retrieves all [[Project]]s from the collection
     * @returns Promise<[[Project]]>
     */
    public static async getProjects(): Promise<Array<Project>> {

        return await ProjectModel.find({})
        .sort({ _id: 1 })
        .then((result: Array<Project>) => {
            if (!result.length) {
                throw new HTTPError(404, { error: `No projects exist at this time` });
            }

            return result;
        });
    };

    /**
     * Adds a new [[Project]] to the collection
     * @param payload - the [[Project]] object
     * @returns Promise<ObjectId>
     */
    public static addProject(payload: Project): Promise<ObjectId> {
        return new ProjectModel(payload).save()
        .then((message: InstanceType<Project>): ObjectId => {
            return message._id;
        })
        .catch((error: Error.ValidationError) => {

            throw new HTTPError(400, { error });
        });
    };
}
