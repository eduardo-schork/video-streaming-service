import HttpException from "@core/errors/http-exception";

class MissingMovieIdError extends HttpException {
  constructor() {
    super(400, "Missing movie id", []);
  }
}

export default MissingMovieIdError;
