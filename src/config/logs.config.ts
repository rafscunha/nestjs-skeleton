import { LogLevel } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface.js';
import { ConfigService } from '@nestjs/config';

export function logsConfiguration(app: INestApplication) {
  const configService = app.get(ConfigService);
  const logLevel = configService.getOrThrow<string>('NODE_ENV');

  const isProduction = logLevel.toLowerCase().includes('prod');

  let defaultLogs: LogLevel[] = ['fatal', 'error', 'warn', 'log'];
  if (!isProduction) {
    defaultLogs.push('debug', 'verbose');
  }

  app.useLogger(defaultLogs);
}
