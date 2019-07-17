import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import {RegistrationController} from "./controllers/RegistrationController";
import {AuthenticationController} from "./controllers/AuthenticationController";
import {UserController} from "./controllers/UserController";
import {ProjectController} from "./controllers/ProjectController";
import {BoardController} from "./services/board-service/controllers/BoardController";
import passport from "./services/authentication/JWTVerificationService";

const app: express.Application = express();
const port: string = process.env.PORT || "3000";

// Configuration
app.use(bodyParser.json()); // Body parser middleware
app.use(compression()); // GZip compression middleware
app.use(cors()); // CORS configuration
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Content-Type",'application/json');
    next();
});

// Routes
app.use(`/register`, RegistrationController);
app.use(`/login`, AuthenticationController);
app.use(`/project`, ProjectController);
app.use(`/user`, passport.authenticate('jwt', { session: false }), UserController);
app.use(`/board`, passport.authenticate('jwt', { session: false }), BoardController);

app.listen(port, () => {
    console.log(`Started the server on port ${port}`);
});
