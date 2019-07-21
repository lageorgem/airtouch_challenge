/**
 * @module Server
 */

import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import { RegistrationController } from "./controllers/RegistrationController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { UserController } from "./controllers/UserController";
import { ProjectController } from "./controllers/ProjectController";
import passport from "./middleware/userGuardian";
import { adminGuardian } from "./middleware/adminGuardian";
import { RoleController } from "./controllers/RoleController";
import { Configuration, IExpressConfig } from "./models/configuration/Configuration";

/**
 * Express server instance
 */
const app: express.Application = express();
/**
 * Express configuration
 */
const config: IExpressConfig = Configuration.getInstance().getExpressConfig();

// Configuration
app.use(bodyParser.json()); // Body parser middleware
app.use(compression()); // GZip compression middleware
app.use(cors()); // CORS configuration
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Content-Type", "application/json");
    next();
});

// Routes
app.use(`/register`, RegistrationController);
app.use(`/login`, AuthenticationController);
app.use(`/projects`, ProjectController);
app.use(`/users`, passport.authenticate("jwt", { session: false }), UserController);
app.use(`/roles`, passport.authenticate("jwt", { session: false }), adminGuardian, RoleController);

app.listen(config.port, () => {
    console.log(`Started the server on port ${config.port}`);
});
