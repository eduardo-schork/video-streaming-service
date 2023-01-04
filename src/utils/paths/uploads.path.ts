const { dirname } = require("path");

const uploadsPath = dirname(require?.main?.filename) + "/storage/uploads";

export default uploadsPath;
