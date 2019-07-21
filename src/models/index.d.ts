import * as mongoose from "mongoose";
import { InstanceType, Typegoose } from "typegoose";

type Model<T> = mongoose.Model<InstanceType<T>, {}> & Typegoose & T;
