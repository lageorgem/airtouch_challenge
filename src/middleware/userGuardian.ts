/**
 * @module Authorization
 */

import * as passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import * as fs from "fs";
import * as path from "path";
import { ObjectId } from "mongodb";
import { User, UserModel } from "../models/User";
import { InstanceType } from "typegoose";

/**
 * Passport JWT strategy options
 */
const options: StrategyOptions = {
    /**
     * Extracted JWT
     */
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    /**
     * Public key for JWT verification
     */
    secretOrKey: fs.readFileSync(path.resolve(__dirname, '../keys/public.pem'), 'utf8'),
    /**
     * Issuer of the JWT
     */
    issuer: "airtouchmedia.com",
    /**
     * Audience of the JWT
     */
    audience: "airtouchmedia.com",
    /**
     * JWT signing algorithm
     */
    algorithms: ["RS256"]
};

/**
 * Passport JWT strategy for guarding against unauthorized access to user endpoints
 */
const strategy: Strategy = new Strategy(options, (JWT: any, next: VerifiedCallback): void => {
    UserModel.findOne({ _id: ObjectId.createFromHexString(JWT.sub) }, { password: 0 })
    .then((result: InstanceType<User> | null) => {
        if (result) {
            // Attach role to user object
            Object.assign(result, { role: JWT.role });
            next(null, result);
        } else {
            next({
                error: "Token is not valid"
            });
        }
    })
    .catch((err: Error) => {
        next(err);
    });
});

passport.use(strategy);

export default passport;
