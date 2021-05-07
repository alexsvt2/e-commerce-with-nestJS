import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartDTO } from './cart.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCart(@Body() cart: CartDTO, @Request() req) {
    return await this.cartService.create(cart, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Request() req) {
    return await this.cartService.getCartList(req.user._id);
  }

  @Delete('/:productId')
  @UseGuards(AuthGuard('jwt')) 
  async deleteCart( @Request() req ,@Param('productId') productId:string ) {
    return await this.cartService.deleteListCart(req.user._id,productId);
  }
}
