/**
 * @module Mongoose
 */

import * as mongoose from "mongoose";
import { Configuration, IMongoConfig } from "../models/configuration/Configuration";

/**
 * Service class for interacting with the database using mongoose
 */
class MongooseService {
    /**
     * Unique instance of [[MongooseService]]
     */
    private static instance: MongooseService;
    /**
     * Mongoose client for database interaction
     */
    private readonly mongooseClient: mongoose.Connection;
    /**
     * Mongoose configuration
     */
    private readonly config: IMongoConfig;

    private constructor() {
        this.config = Configuration.getInstance().getMongoConfig();
        this.mongooseClient = mongoose.createConnection(this.config.connectionUri, this.config.options);
    }

    /**
     * Retrieves the unique instance of the Mongoose Service
     * @returns [[MongooseService]]
     */
    public static getInstance(): MongooseService {
        if (!this.instance) {
            this.instance = new MongooseService();
        }

        return MongooseService.instance;
    }

    /**
     * Retrieves the Mongoose Client instance
     * @returns mongoose.Connection
     */
    public getClient(): mongoose.Connection {
        return this.mongooseClient;
    }
}

export default MongooseService;
