import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() product: string, @Request() req) {
    return this.wishlistService.create(product, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async get(@Request() req) {
    return this.wishlistService.get(req.user._id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Request() req, @Query('productId') productId:string) {
    return this.wishlistService.deleteOne(req.user._id,productId);
  }
}
