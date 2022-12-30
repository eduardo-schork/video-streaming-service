import multer from "multer";
import path from "path";
import { FileSystemAdapter } from "./types";

const STORAGE_PATH = path.resolve(__dirname + "/storage");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, STORAGE_PATH);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = new Date().getTime();

    callback(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const multerUpload = multer({ storage: storage });

const MulterStorageSystemAdapter: FileSystemAdapter = {
  upload: multerUpload,
  fileStoragePath: STORAGE_PATH,
};

export default MulterStorageSystemAdapter;
