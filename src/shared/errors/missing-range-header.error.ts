import HttpException from '@shared/errors/http-exception';

class MissingRangeHeaderError extends HttpException {
  constructor() {
    super(400, 'Missing range header on request', []);
  }
}

export default MissingRangeHeaderError;
