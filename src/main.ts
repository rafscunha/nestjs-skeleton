import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter } from '@nestjs/platform-fastify/adapters/fastify-adapter.js';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces/nest-fastify-application.interface.js';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common/services/logger.service.js';
import { swaggerConfig } from './config/swagger.config.js';
import { serializationConfig } from './config/serialization.config.js';
import { corsConfig } from './config/cors.config.js';
import { logsConfiguration } from './config/logs.config.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const nodeEnv = configService.getOrThrow<string>('NODE_ENV');

  // Configure global logging level based on environment
  logsConfiguration(app);

  // Configure global serialization and validation settings for incoming requests and outgoing responses
  serializationConfig(app);

  // Enable swagger documentation with configuration from environment variables
  swaggerConfig(app);

  // Enable CORS with allowed origins and methods from configuration
  corsConfig(app);

  const logger = new Logger('Bootstrap');
  const port = configService.getOrThrow<number>('APP_PORT');
  const bindHost = configService.get<string>('BIND_HOST', '0.0.0.0');

  logger.log(
    `Starting application in ${nodeEnv} mode on port ${port} and host ${bindHost}`,
  );

  await app.listen(port, bindHost);
}
await bootstrap();
