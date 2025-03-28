import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {config} from 'dotenv';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Your App API')
      .setDescription('API description for your NestJS application')
      .setVersion('1.0')
      .addTag('users', 'User-related endpoints')
      .addTag('quiz', 'Quiz-related endpoints')
      .addTag('auth', 'Authentication-related endpoints')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

config();
bootstrap();
