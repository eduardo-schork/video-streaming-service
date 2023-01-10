import HttpException from "@shared/errors/http-exception";

class LoadFileError extends HttpException {
  constructor(errors: any[]) {
    super(500, "Error trying to load file", errors);
  }
}

export default LoadFileError;
