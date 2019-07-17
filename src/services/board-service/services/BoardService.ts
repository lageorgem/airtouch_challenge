import HTTPError from "../../../models/exceptions/HTTPError";
import {InstanceType} from "typegoose";
import {Project, ProjectModel} from "../../../models/Project";

export class BoardService {

    /**
     * Retrieves the Project board
     * @returns Promise<Array<Project>>
     */
    public static async getBoard(): Promise<Array<Project>> {
        return await ProjectModel.find({}).sort({ _id: 1 })
        .then((result: Array<InstanceType<Project>> | null) => {
            if (!result) {
                throw new HTTPError(404, { error: `No messages were found.`});
            }

            return result;
        });
    };
}
