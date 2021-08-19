import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { contentParser } from "fastify-multer";
import "reflect-metadata";
import { join } from "path";
import helmet from "fastify-helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const swaggerDocument = new DocumentBuilder()
  .setTitle("Client")
  .setDescription("Client")
  .setVersion("1.0")
  .addTag("Client")
  .build();

async function bootstrap() {
  const appClient = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  appClient.useStaticAssets({
    root: join(__dirname, ".", "client"),
    prefix: '/*',
  });
  appClient.setGlobalPrefix("/api");
  await appClient.listen(3000, "0.0.0.0", (err, addr) => {
    if (err) {
      console.log(err);
    }
    console.log(`address: ${addr}`);
  });
  appClient.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  appClient.register(contentParser);

  SwaggerModule.setup(
    "api",
    appClient,
    SwaggerModule.createDocument(appClient, swaggerDocument)
  );

  const appAdmin = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  appAdmin.useStaticAssets({
    root: join(__dirname, ".", "admin"),
    prefix: '/*',
  });
  appAdmin.setGlobalPrefix("/api");
  await appAdmin.listen(5000, "0.0.0.0", (err, addr) => {
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
        imgSrc: [`'self'`, "data:", "validator.swagger.io"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  appAdmin.register(contentParser);

  SwaggerModule.setup(
    "api",
    appAdmin,
    SwaggerModule.createDocument(appAdmin, swaggerDocument)
  );
}
bootstrap();
