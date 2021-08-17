import {
    CallHandler,
    ExecutionContext,
    Inject,
    mixin,
    NestInterceptor,
    Optional,
    Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer, diskStorage } from 'multer';
import { GalleriesService } from '../galleries.service';

type MulterInstance = any;
export function FastifyFilesInterceptor(
    fieldName: string,
    maxCount?: number,
): Type<NestInterceptor> {
    class MixinInterceptor implements NestInterceptor {
        protected multer: MulterInstance;

        localoptions: Options = {
            storage: diskStorage({
                destination: this.galleriesService.editDestination,
                filename: this.galleriesService.editFileName,
            }),
            //fileFilter: imageFileFilter,
        }

        constructor(
            @Optional()
            @Inject('MULTER_MODULE_OPTIONS') options: Multer,
            private galleriesService: GalleriesService
        ) {

            this.multer = (FastifyMulter as any)({
                ...options,
                ...this.localoptions
            });
        }


        async intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Promise<Observable<any>> {
            const ctx = context.switchToHttp()

            await new Promise<void>((resolve, reject) =>
                this.multer.array(fieldName, maxCount)(
                    ctx.getRequest(),
                    ctx.getResponse(),
                    (error: any) => {
                        if (error) {
                            // const error = transformException(err);
                            return reject(error);
                        }
                        resolve();
                    },
                ),
            );
            return next.handle();
        }
    }
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>;
}