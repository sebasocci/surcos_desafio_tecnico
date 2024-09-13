import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.message.includes('invalid input syntax for type bigint') ? 404 : 500;

    response
      .status(status)
      .json({
        statusCode: status,
        message: status === 404 ? 'Recurso no encontrado' : 'Internal server error',
        path: request.url,
      });
  }
}
