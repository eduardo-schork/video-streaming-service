import database from "@infra/database/database";
import httpsServer from "@infra/https-server/https-server";

require("dotenv").config();

async function start() {
  await database.run();
  httpsServer.run();
}

start();
