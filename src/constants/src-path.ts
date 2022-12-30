function getSrcPath() {
  const path = require.main?.path;
  return path;
}

export default getSrcPath;
