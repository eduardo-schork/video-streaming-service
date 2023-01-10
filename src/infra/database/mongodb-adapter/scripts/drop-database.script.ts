import DatabasePort from "../../database.port";

require("dotenv").config();

async function execute() {
  const databaseInstance = await DatabasePort.connectToDatabase();

  await databaseInstance?.connection.db.dropDatabase();
  console.log("Drop database finished");
  process.exit(0);
}

execute();
