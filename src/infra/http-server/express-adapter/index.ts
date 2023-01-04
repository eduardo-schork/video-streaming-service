import express, { Express } from "express";
import cors from "cors";
import { HttpServerPortInterface } from "../types";
import router from "./routes/router";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

class ExpressAdapter implements HttpServerPortInterface {
  expressServer: Express;

  constructor() {
    const expressInstace = express();

    this.expressServer = expressInstace;
  }

  _registerMiddlewares() {
    this.expressServer.use(cors(corsOptions));
    this.expressServer.use(express.json());
    this.expressServer.use(router);
    this.expressServer.use(errorHandlerMiddleware);
  }

  runHttpServer() {
    const httpPort = process.env.HTTP_PORT;

    this._registerMiddlewares();

    this.expressServer.listen(httpPort, () => {
      console.log(`ExpressHttpServer app listening on port ${httpPort}`);
    });
  }
}

export default new ExpressAdapter();
