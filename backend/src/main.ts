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
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
const swaggerDocument = new DocumentBuilder()
  .setTitle('Client')
  .setDescription('Client')
  .setVersion('1.0')
  .addTag('Client')
  .build();

async function bootstrap() {

  const appClient = await NestFactory.create<NestFastifyApplication>(
    ClientModule,
    new FastifyAdapter()
  );
  appClient.useStaticAssets({root: join(__dirname, '.', 'client/dist')});
  await appClient.listen(3000, '0.0.0.0', (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });



  const appAdmin = await NestFactory.create<NestFastifyApplication>(
    AdminModule,
    new FastifyAdapter()
  );
  appAdmin.useStaticAssets({root: join(__dirname, '.', 'admin/dist')});
  await appAdmin.listen(3001, '0.0.0.0', (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });



  const appAPI = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  appAPI.setGlobalPrefix('/api');
  await appAPI.listen(5000, '0.0.0.0', (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });
  appAPI.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  appAPI.register(contentParser);

  SwaggerModule.setup(
    'api',
    appAPI,
    SwaggerModule.createDocument(appAPI, swaggerDocument)
  );
}
bootstrap();
