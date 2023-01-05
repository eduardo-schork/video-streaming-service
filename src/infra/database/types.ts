import { Mongoose } from "mongoose";

export interface DatabasePortInterface {
  connectToDatabase(): Promise<Mongoose | void>;
}
