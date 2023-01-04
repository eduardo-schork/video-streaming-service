import DatabasePort from "@infra/database/database.port";
import HttpServerPort from "@infra/http-server/http-server.port";

require("dotenv").config();

async function start() {
  DatabasePort.run();
  HttpServerPort.run();
}

start();
