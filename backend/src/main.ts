import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { contentParser } from 'fastify-multer';
import 'reflect-metadata';
import { join } from 'path';
import helmet from 'fastify-helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

async function bootstrap() {

  const appClient = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  appClient.setGlobalPrefix('/api');
  appClient.useStaticAssets({root: join(__dirname, '.', 'client/dist')});
  await appClient.listen(3000, '0.0.0.0', (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });

  const appAdmin = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  appAdmin.setGlobalPrefix('/api');
  appAdmin.useStaticAssets({root: join(__dirname, '.', 'admin/dist')});
  await appAdmin.listen(5000, '0.0.0.0', (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });
  appAdmin.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  appAdmin.register(contentParser);

  SwaggerModule.setup(
    'api',
    appAdmin,
    SwaggerModule.createDocument(appAdmin, swaggerDocument)
  );
}
bootstrap();
