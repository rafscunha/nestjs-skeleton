import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator.js';

@Injectable()
export class ThrottlerConfig implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      throttlers: [
        {
          name: 'default',
          limit: this.configService.get<number>('THROTTLE_LIMIT', 10),
          ttl: this.configService.get<number>('THROTTLE_TTL', 60000),
          blockDuration: this.configService.get<number>(
            'THROTTLE_BLOCK_DURATION',
            60000,
          ),
        },
      ],
    };
  }
}
