import { Module, Global, DynamicModule } from '@nestjs/common';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class RedisModule {
  static register(): DynamicModule {
    const configService = new ConfigService();

    if (configService.get('USE_REDIS') === 'true') {
      return {
        module: RedisModule,
        providers: [
          {
            provide: 'REDIS_CLIENT',
            useFactory: async () => {
              const client = createClient({
                url: configService.get('REDIS_URL'),
                socket: {
                  connectTimeout: 5000,  
                },
              });

              client.on('error', (err) => console.log('Redis Client Error', err));

              await client.connect();

              return client;
            },
          },
        ],
        exports: ['REDIS_CLIENT'],
      };
    }

    return {
      module: RedisModule,
    };
  }
}
