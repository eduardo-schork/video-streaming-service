import HttpException from "@core/errors/http-exception";
import { NextFunction, Request, Response } from "express";

function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    return response.status(error.statusCode).send({
      message: error.message,
      errors: error.errors,
    });
  }
  return response.status(500).send({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
}

export default errorHandlerMiddleware;
