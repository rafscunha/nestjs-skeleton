import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface.js';
import { ConfigService } from '@nestjs/config';

export function corsConfig(app: INestApplication) {
  const configService = app.get(ConfigService);
  const allowedOrigins = configService.getOrThrow<string>(
    'CORS_ALLOWED_ORIGINS',
  );
  const allowedMethods = configService.getOrThrow<string>(
    'CORS_ALLOWED_METHODS',
  );

  app.enableCors({
    origin: allowedOrigins,
    methods: allowedMethods,
  });

  // Enable CSRF protection with cookie and header names from configuration
  app.enableCsrfProtection();
}
