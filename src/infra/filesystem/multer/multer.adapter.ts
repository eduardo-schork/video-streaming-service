import multer from "multer";

import { FilesystemPortInterface } from "../types";

import uploadsPath from "src/utils/paths/uploads.path";
import { generateUuid } from "src/utils/uuid";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsPath);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = generateUuid();

    callback(null, `${uniqueSuffix}${file.originalname}`);
  },
});

const multerUploadOne = multer({ storage: storage }).single("file");

const MulterStorageSystemAdapter: FilesystemPortInterface = {
  uploadOne: multerUploadOne,
};

// TODO pass this file to class
export default MulterStorageSystemAdapter;
