/**
 * @module Authentication
 */

import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import HTTPError from "../../models/exceptions/HTTPError";
import { RoleService } from "../RoleService";
import { Role } from "../../models/Role";
import { PromisifiedReadFile, PromisifiedSign } from "./index";

/**
 * Promisified version of fs.readFile
 */
const readFile: PromisifiedReadFile = promisify<fs.PathLike | number, { encoding?: string | null; flag?: string; } | string | undefined | null, string | Buffer>(fs.readFile);
/**
 * Promisified version of jwt.sign
 */
const sign: PromisifiedSign = promisify<string | Buffer | object, jwt.Secret, jwt.SignOptions, string>(jwt.sign);

/**
 * Service class for generating JWT
 */
class JWTGenerationService {
    /**
     * Algorithm used to sign the token
     */
    private static readonly algorithm: string = "RS256";
    /**
     * Token expiry time
     */
    private static readonly expiresIn: string = "24 hrs";
    /**
     * Token availability start time
     */
    private static readonly notBefore: string = "0";
    /**
     * Token audience
     */
    private static readonly audience: string = "airtouchmedia.com";
    /**
     * Token issuer
     */
    private static readonly issuer: string = "airtouchmedia.com";

    /**
     * Generate new JWT for the provided subject
     * @param subject - the [[User]]'s _id
     * @returns Promise<string>
     */
    public static async generate(subject: string): Promise<string> {
        const options: jwt.SignOptions = {
            algorithm: this.algorithm,
            expiresIn: this.expiresIn,
            notBefore: this.notBefore,
            audience: this.audience,
            issuer: this.issuer,
            subject: subject
        };

        const userRole: Role = await RoleService.getRole(subject);

        return readFile(path.resolve(__dirname, "../../keys/private.key"), { encoding: "utf8" })
        .then((certificate: string | Buffer) => {
            return sign({ role: userRole.role }, certificate, options);
        })
        .catch((err: Error) => {
            throw new HTTPError(500, { error: JSON.stringify(err) });
        });
    }
}

export default JWTGenerationService;
