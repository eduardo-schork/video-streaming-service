import HttpException from "@core/errors/http-exception";

class LoadFileError extends HttpException {
  constructor(errors: any[]) {
    super(500, "Error trying do load file", errors);
  }
}

export default LoadFileError;
