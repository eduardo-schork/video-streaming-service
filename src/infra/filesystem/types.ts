import { RequestHandler } from 'express';

export interface FilesystemPortInterface {
  uploadOne: RequestHandler;
}
