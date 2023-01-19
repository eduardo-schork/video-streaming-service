import HttpException from './http-exception';

class EntityNotFoundError extends HttpException {
  constructor() {
    super(400, 'Entity not found', []);
  }
}

export default EntityNotFoundError;
