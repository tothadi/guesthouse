import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClientController } from './client.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'client'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [ClientController]
})
export class ClientModule {}
