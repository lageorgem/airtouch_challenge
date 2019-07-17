import * as jwt from 'jsonwebtoken';
import {SignOptions} from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";
import HTTPError from "../../models/exceptions/HTTPError";

class JWTGenerationService {
    private static readonly algorithm: string = "RS256";
    private static readonly expiresIn: string = "24 hrs";
    private static readonly notBefore: string = "0";
    private static readonly audience: string = "airtouchmedia.com";
    private static readonly issuer: string = "airtouchmedia.com";

    /**
     * Generate new JWT for the provided subject
     * @param subject - the User's _id
     * @returns the JWT
     */
    public static generate(subject: string): string {
        const options: SignOptions = {
            algorithm: this.algorithm,
            expiresIn: this.expiresIn,
            notBefore: this.notBefore,
            audience: this.audience,
            issuer: this.issuer,
            subject: subject
        };

        try {
            const certificate = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'utf8');
            return jwt.sign({foo: 'bar'}, certificate, options);
        } catch (e) {
            throw new HTTPError(500, { error: JSON.stringify(e) });
        }
    }
}

export default JWTGenerationService;
