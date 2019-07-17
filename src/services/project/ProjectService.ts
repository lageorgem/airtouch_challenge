import {ObjectId} from "mongodb";
import {Project, ProjectModel} from '../../models/Project'
import HTTPError from "../../models/exceptions/HTTPError";
import {InstanceType} from "typegoose";
import {Error} from "mongoose";

export class ProjectService {

    /**
     * Retrieves a Project from the collection based on ID.
     * @param id - the _id of the message
     * @returns Promise<ObjectId>
     */
    public static async getProject(id: ObjectId): Promise<Project> {

        return await ProjectModel.findOne({ _id: id })
        .then((result: InstanceType<Project> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `Project id ${id} was not found.`});
            }

            return result;
        });
    };

    /**
     * Adds a new message to the board
     * @param payload - the Project object
     * @returns Promise<ObjectId>
     */
    public static addProject(payload: Project): Promise<ObjectId> {
        return new ProjectModel(payload).save()
        .then((message: InstanceType<Project>): ObjectId => {
            return message._id;
        })
        .catch((error: Error.ValidationError) => {
            let errors = Object.entries(error.errors).map((kv: any) => {
                let [k, v] = kv;

                return v.message;
            });

            throw new HTTPError(400, { error: errors });
        });
    };
}
