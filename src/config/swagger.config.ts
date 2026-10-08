import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication) {
  const configService = app.get(ConfigService);

  const swaggerTitle = configService.getOrThrow<string>('SWAGGER_TITLE');
  const swaggerDescription = configService.getOrThrow<string>(
    'SWAGGER_DESCRIPTION',
  );
  const swaggerVersion = configService.getOrThrow<string>('SWAGGER_VERSION');
  const swaggerTag = configService.getOrThrow<string>('SWAGGER_TAG');
  const swaggerPath = configService.getOrThrow<string>('SWAGGER_PATH');

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addTag(swaggerTag)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, documentFactory);
}
