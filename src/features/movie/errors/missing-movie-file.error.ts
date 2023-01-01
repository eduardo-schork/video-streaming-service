import HttpException from "@core/errors/http-exception";

class MissingMovieFileError extends HttpException {
  constructor() {
    super(400, "Missing movie file on create", []);
  }
}

export default MissingMovieFileError;
