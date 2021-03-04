/* eslint-disable prettier/prettier */
import { Controller, Delete, Param, Post, UploadedFile,UseGuards,UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guards/admin.guards';
import { FilesService } from '../uploadFile.service';

import { ApiTags,ApiConsumes ,ApiBody} from '@nestjs/swagger';
import { FileUploadDto } from './file.dto';

@ApiTags('Upload-files')
@Controller('upload')
export class UploadController {

    constructor(
        private uploadfileService: FilesService) {}
    
    @Post('/upload')
    @UseGuards(AuthGuard('jwt') , AdminGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'upload single file',
  type: FileUploadDto,
})
    async uploadImage( @UploadedFile() file: Express.Multer.File) {
      return this.uploadfileService.uploadPublicFile( file.buffer, file.originalname);
    }

    @Delete('/deleteImg/:key')
    @UseGuards(AuthGuard('jwt') , AdminGuard)
    async deleteImage(@Param() key: string ) {
      return this.uploadfileService.deletePublicFile(key);
    }
}
