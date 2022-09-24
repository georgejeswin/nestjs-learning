import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFounException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || 'Not Found', status || HttpStatus.NOT_FOUND);
  }
}
