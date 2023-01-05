import { connect } from "mongoose";
import { DatabasePortInterface } from "../types";

class MongodbAdapter implements DatabasePortInterface {
  async connectToDatabase() {
    const mongodbUrl = process.env.MONGODB_URL;

    if (!mongodbUrl) {
      return console.log(
        "Could not connect to MongoDB: database url is missing"
      );
    }

    const databaseInstance = await connect(mongodbUrl);

    console.log("Mongodb connected with success");
    return databaseInstance;
  }
}

export default new MongodbAdapter();
