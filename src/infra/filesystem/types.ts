import { Multer } from "multer";

export interface FileSystemAdapter {
  upload: Multer;
  fileStoragePath: string;
}
