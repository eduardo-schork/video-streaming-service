class HttpException {
  statusCode: number;
  message: string;
  // TODO fix this any to a correct type
  errors: any[];

  constructor(statusCode = 400, message: string, errors: any[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpException;
