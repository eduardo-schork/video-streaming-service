const { dirname } = require("path");

const baseDirPath = dirname(require?.main?.filename);

export default baseDirPath;
