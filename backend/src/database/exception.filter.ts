import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { MongoError } from 'mongodb';

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
            response.status(500).send({ message: 'Internal error.' });
        }

    }
}