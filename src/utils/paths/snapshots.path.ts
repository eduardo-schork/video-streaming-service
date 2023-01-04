const { dirname } = require("path");

const snapshotsPath = dirname(require?.main?.filename) + "/storage/snapshots";

export default snapshotsPath;
