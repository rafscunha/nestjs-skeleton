import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer/class-serializer.interceptor.js';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

export function serializationConfig(app: INestApplication) {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.getOrThrow<string>('NODE_ENV');

  // Enable global validation pipe to validate incoming requests and transform payloads to DTO instances
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: nodeEnv.toLowerCase().includes('prod')
        ? true
        : false,
      transform: true,
    }),
  );

  // Enable global class serializer interceptor to transform response objects to DTO instances
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    }),
  );
}
