import { Body, Controller,Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotifyMeDto } from './notifyMe.dto';
import { NotifymeService } from './notifyme.service';

@Controller('notifyme')
export class NotifymeController {

    constructor(private notifyMeService:NotifymeService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() product: string, @Request() req) {
        let notifyDto: NotifyMeDto = {
            user: req.user._id,
            product: product
        }
      return this.notifyMeService.create(notifyDto);
    }
}
