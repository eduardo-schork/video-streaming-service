class HttpException {
  statusCode: number;
  message: string;
  errors: object[];

  constructor(statusCode = 400, message: string, errors: object[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpException;
