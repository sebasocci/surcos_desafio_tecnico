import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TareaModule } from './tarea/tarea.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),        
        autoLoadEntities: true,
        synchronize: true,
        //ssl: true
        ssl: {
          rejectUnauthorized: false, // Maneja certificados autofirmados
        },
      }),
      inject: [ConfigService],
    }),       
    AuthModule,
    UsuarioModule,
    TareaModule,
    RedisModule.register(), // Llama al método estático para registrar Redis
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}