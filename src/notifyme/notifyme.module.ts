import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { notifyUser } from 'src/models/notifyUser.schema';
import { NotifymeController } from './notifyme.controller';
import { NotifymeService } from './notifyme.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'notifyUser', schema: notifyUser }]),
  ],
  exports: [NotifymeService],
  controllers: [NotifymeController],
  providers: [NotifymeService]
})
export class NotifymeModule {}
