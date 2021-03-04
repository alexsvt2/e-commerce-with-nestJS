import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { FilesService } from './uploadFile.service';
import { UserService } from './user.service';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, FilesService],
  exports: [UserService, FilesService],
  controllers: [UploadController],
})
export class SharedModule {}
