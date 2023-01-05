import HttpException from "@core/errors/http-exception";

class MissingParameterError extends HttpException {
  constructor(missingParameters?: string[]) {
    super(400, "Missing parameter(s): ", missingParameters || []);
  }
}

export default MissingParameterError;
