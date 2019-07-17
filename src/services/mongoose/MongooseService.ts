import * as mongoose from 'mongoose';

class MongooseService {
    private static instance: MongooseService;
    private readonly mongooseClient: mongoose.Connection;

    private constructor() {
        let host: string | undefined = process.env.MONGO_HOST;
        if (!host) {
            throw new Error("MONGO_HOST is undefined");
        }

        this.mongooseClient = mongoose.createConnection(`mongodb://${host}/message-board`, { useNewUrlParser: true });
    }

    /**
     * Retrieves the singleton instance of the Mongoose Service
     * @returns MongooseService
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
