import DatabasePort from '@infra/database/database.port';
import HttpServerPort from '@infra/http-server/http-server.port';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function start() {
  DatabasePort.connectToDatabase();
  HttpServerPort.runHttpServer();
}

start();
