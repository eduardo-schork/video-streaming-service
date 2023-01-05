import DatabasePort from "../../database.port";

require("dotenv").config();

async function execute() {
  const databaseInstance = await DatabasePort.connectToDatabase();

  databaseInstance?.connection.db.dropDatabase();

  console.log("Drop database finished");
}

execute();
