import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Obtener el cuerpo de la respuesta de la excepción
    const responseBody = exception.getResponse() as any;

    // Asegúrate de que responseBody tenga el formato correcto
    let formattedErrors = [];

    if (responseBody.message && Array.isArray(responseBody.message)) {
      formattedErrors = responseBody.message.map((error: ValidationError) => ({
        property: error.property,
        constraints: error.constraints,
      }));
    } else if (typeof responseBody.message === 'string') {
      formattedErrors = [{ message: responseBody.message }];
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'Formato inválido',
        errors: formattedErrors,
      });
  }
}
