import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'admin/dist'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AdminController]
})
export class AdminModule {}
