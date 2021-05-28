import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyController } from './notify/notify.controller';
import { NotifyService } from './notify/notify.service';

@Module({
  imports: [],
  controllers: [AppController, NotifyController],
  providers: [AppService, NotifyService],
})
export class AppModule {}
