import * as fs from "fs";
import { Secret, SignOptions } from "jsonwebtoken";

type PromisifiedReadFile = (path: fs.PathLike | number, options: { encoding?: string | null; flag?: string; } | string | undefined | null) => Promise<string | Buffer>;
type PromisifiedSign = (payload: string | Buffer | object, secretOrPrivateKey: Secret, options: SignOptions) => Promise<string>;
