import HttpException from '@shared/errors/http-exception';

class MissingFileOnBodyError extends HttpException {
  constructor() {
    super(400, 'Missing file on request body', []);
  }
}

export default MissingFileOnBodyError;
