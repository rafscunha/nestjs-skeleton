import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './config/database.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([]), // Add your entities here
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
