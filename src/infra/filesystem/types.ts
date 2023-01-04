import { RequestHandler } from "express";

export interface IFileSystemPort {
  uploadOne: RequestHandler;
}
