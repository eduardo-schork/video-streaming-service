import { connect } from "mongoose";
import { DatabaseAdapter } from "../types";

const run = async () => {
  const mongodbUrl = process.env.MONGODB_URL;

  if (!mongodbUrl) {
    return console.log("Could not connect to MongoDB: database url is missing");
  }

  await connect(mongodbUrl);
  console.log("Mongodb connected with success");
};

const MongodbAdapter: DatabaseAdapter = {
  run,
};

export default MongodbAdapter;
