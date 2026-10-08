import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator.js';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.getOrThrow<string>('DB_ENGINE') as any,
      host: this.configService.getOrThrow<string>('DB_HOST'),
      port: this.configService.getOrThrow<number>('DB_PORT'),
      username: this.configService.getOrThrow<string>('DB_USERNAME'),
      password: this.configService.getOrThrow<string>('DB_PASSWORD'),
      database: this.configService.getOrThrow<string>('DB_NAME'),
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', false),
      logging: this.configService.get<boolean>('DB_LOGGING', false),
      // entities: [__dirname + '/../**/*.entity.{ts,js}'] // todo: precisa apontar para o @quasarit
    };
  }
}
