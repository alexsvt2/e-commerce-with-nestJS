import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
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
  createCart(@Body() cart: CartDTO, @Request() req) {
    return this.cartService.create(cart, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getCart(@Request() req) {
    return this.cartService.getCartList(req.user._id);
  }
}
