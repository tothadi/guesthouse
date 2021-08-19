import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    //ConfigModule,
    MailerModule.forRootAsync({
      //imports: [ConfigModule],
      useFactory: async (/*configService: ConfigService*/) => ({
        transport: {
          host: process.env.MAILER_HOST,//configService.get<string>('MAILER_HOST'),
          secure: true,
          auth: {
            user: process.env.MAILER_USER,//configService.get<string>('MAILER_USER'),
            pass: process.env.MAILER_PASS,//configService.get<string>('MAILER_PASS')
          }
        },
        defaults: {
          from: '"No Reply" <noreply@tothadi.hu>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      //inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
