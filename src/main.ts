import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedFilter } from './utilidades/query-failed.filter';
import { HttpExceptionFilter } from './utilidades/query-invalid.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());

  // Utilizo filtros para los request de manera global
  app.useGlobalFilters(new QueryFailedFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Surcos')
    .setDescription('La API RESTFUL para gestión de tareas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://stockcity-frontend.onrender.com'],        
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si se necesita enviar cookies o autorizaciones
  });

  await app.listen(3001);
}
bootstrap();
