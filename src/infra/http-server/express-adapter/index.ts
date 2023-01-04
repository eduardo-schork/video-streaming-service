import express, { Express } from "express";
import cors from "cors";
import { HttpServerAdapter } from "../types";
import router from "./routes/router";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

// TODO only enable cors on develop env
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const registerMiddlewares = (expressServer: Express) => {
  expressServer.use(cors(corsOptions));
  expressServer.use(express.json());
  expressServer.use(router);
  expressServer.use(errorHandlerMiddleware);
};

const run = () => {
  const httpPort = process.env.HTTP_PORT;

  const expressServer = express();

  registerMiddlewares(expressServer);

  expressServer.listen(httpPort, () => {
    console.log(`ExpressHttpServer app listening on port ${httpPort}`);
  });
};

const ExpressAdapter: HttpServerAdapter = {
  run,
};

export default ExpressAdapter;
