import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseUrl = process.env.DATABASE_URL;

@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  createTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      //url: this.configService.get<string>('DATABASE_URL'),
      url: databaseUrl,
      synchronize: true, // Solo para desarrollo
      autoLoadEntities: true,
      ssl: true
    };
  }
}
