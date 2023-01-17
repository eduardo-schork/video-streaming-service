class HttpException {
  statusCode: number;

  message: string;

  // TODO fix this any to a correct type
  errors: unknown[];

  // eslint-disable-next-line default-param-last
  constructor(statusCode = 400, message: string, errors: unknown[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpException;
