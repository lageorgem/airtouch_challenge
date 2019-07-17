import * as passport from 'passport';
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import * as fs from "fs";
import * as path from "path";
import {ObjectId} from "mongodb";
import {User, UserModel} from "../../models/User";
import {InstanceType} from "typegoose";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync(path.resolve(__dirname, '../keys/public.pem'), 'utf8'),
    issuer: "airtouchmedia.com",
    audience: "airtouchmedia.com",
    algorithms: ["RS256"]
};

const strategy: Strategy = new Strategy(options, (JWT: any, next): void => {
    UserModel.findOne({ _id: ObjectId.createFromHexString(JWT.sub) })
    .then((result: InstanceType<User> | null) => {
        if (result) {
            next(null, result);
        } else {
            next(null, false, {
                error: "Token is not valid"
            });
        }
    });
});

passport.use(strategy);

export default passport;
