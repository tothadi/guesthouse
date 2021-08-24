import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { MongoError } from "mongodb";
import { join } from "path";
import { createReadStream } from "fs";

@Catch()
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    response.status(400).send({ message: exception.message });
  }
}

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    if (exception.code === 11000) {
      response.status(400).send({ message: exception.message });
    } else {
      response.status(500).send({ message: "Internal error." });
    }
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<FastifyReply>();
    const port = request.headers.host.split(":")[1];
    const dir = port === "3000" ? "client" : "admin";
    const path = join(__dirname, ".", dir, "dist/index.html");
    const stream = createReadStream(path);
    response.type('text-html').send(stream);
  }
}
