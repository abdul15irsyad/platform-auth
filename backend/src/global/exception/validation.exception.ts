import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
