import HttpException from '@shared/errors/http-exception';

class LoadFileError extends HttpException {
  constructor(errors: unknown[]) {
    super(500, 'Error trying to load file', errors);
  }
}

export default LoadFileError;
