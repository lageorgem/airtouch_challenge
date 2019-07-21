/* tslint:disable */
import { User, UserModel } from "../models/User";
import { AccessRole, Role, RoleModel } from "../models/Role";
import { ObjectID } from "bson";

async function seed() {
    const adminUser = new UserModel();
    const adminRole = new RoleModel();

    Object.assign(adminUser, {
        _id: "5d2f583986310f0008fc9b23",
        username: "admin",
        password: "$2b$10$SZFkezCf4d/vq4AN1Z81UezN78ZghQLJgaLuPxxvSblNzV.MSGBsG",
        firstName: "Administrator",
        lastName: "Account",
        email: "webmaster@airtouchmedia.com",
    });

    Object.assign(adminRole, {
        _id: "5d31b296d967e000089bec57",
        userId: ObjectID.createFromHexString("5d2f583986310f0008fc9b23"),
        role: AccessRole.AdministratorRole,
    });

    Promise.all([adminUser.save(), adminRole.save()])
    .then((result: Array<User | Role>) => {
        console.log(`User created: ${JSON.stringify(result[0])}`);
        console.log(`Role created: ${JSON.stringify(result[1])}`);
        process.exit(0);
    })
    .catch((err: Error) => {
        console.error(`Error: ${JSON.stringify(err)}`);
        process.exit(-1);
    });
}

seed();
