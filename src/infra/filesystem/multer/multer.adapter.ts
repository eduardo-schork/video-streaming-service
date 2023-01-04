import multer from "multer";

import { IFileSystemPort } from "../types";

import uploadsPath from "@utils/paths/uploads.path";
import { generateUuid } from "@utils/uuid";

const STORAGE_PATH = uploadsPath;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, STORAGE_PATH);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = generateUuid();

    callback(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const multerUploadOne = multer({ storage: storage }).single("file");

const MulterStorageSystemAdapter: IFileSystemPort = {
  uploadOne: multerUploadOne,
};

export default MulterStorageSystemAdapter;
