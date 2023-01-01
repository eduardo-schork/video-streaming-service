import database from "@infra/database/database";
import httpServer from "@infra/http-server/http-server";

require("dotenv").config();

async function start() {
  await database.run();
  httpServer.run();
}

start();
