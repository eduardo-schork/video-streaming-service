import multer from 'multer';

import uploadsPath from '@utils/paths/uploads.path';
import generateUuid from '@utils/uuid';
import { FilesystemPortInterface } from '../types';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadsPath);
  },
  filename(req, file, callback) {
    const uniqueSuffix = generateUuid();

    callback(null, `${uniqueSuffix}${file.originalname}`);
  },
});

const multerUploadOne = multer({ storage }).single('file');

const MulterStorageSystemAdapter: FilesystemPortInterface = {
  uploadOne: multerUploadOne,
};

// TODO pass this file to class
export default MulterStorageSystemAdapter;
