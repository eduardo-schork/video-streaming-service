import express, { Express } from "express";

import { HttpsServerAdapter } from "../types";
import router from "./routes/router";

const registerMiddlewares = (expressServer: Express) => {
  expressServer.use(express.json());
  expressServer.use(router);
};

const run = () => {
  const httpsPort = process.env.HTTPS_PORT;

  const expressServer = express();

  registerMiddlewares(expressServer);

  expressServer.listen(httpsPort, () => {
    console.log(`expressServer app listening on port ${httpsPort}`);
  });
};

const ExpressAdapter: HttpsServerAdapter = {
  run,
};

export default ExpressAdapter;
