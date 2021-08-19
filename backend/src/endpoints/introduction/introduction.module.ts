import { Module } from '@nestjs/common';
import { IntroductionController } from './introduction.controller';
import { IntroductionService } from './introduction.service';
import { introductionProviders } from './introduction.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [IntroductionController],
    providers: [IntroductionService, ...introductionProviders],
})
export class IntroductionModule {}