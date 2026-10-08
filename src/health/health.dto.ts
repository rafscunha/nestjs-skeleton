import { Expose } from 'class-transformer';

export class HealthDto {
  @Expose()
  status!: string;

  @Expose()
  info?: Record<string, any>;

  @Expose()
  error?: Record<string, any>;

  @Expose()
  details!: Record<string, any>;
}
