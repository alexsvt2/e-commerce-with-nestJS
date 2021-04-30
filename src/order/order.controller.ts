import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getAllOrders(@Query() query: any) {
    const { perPage, page, ...restQuery } = query;
    return await this.orderService.getOrders(page, perPage, restQuery);
  }
  @Get(':id')
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getOrder(@Param('id') id: string) {
    return await this.getOrder(id);
  }

  @Post()
  async createOrder(
    @Body() orderDto: OrderDto,
    @Request() req,
    amount: number,
    amountWithTax: number,
  ) {
    return await this.createOrder(
      orderDto,
      req.user._id,
      amount,
      amountWithTax,
    );
  }
  @Put('/:id')
  async updateOrder(@Body('status') status: string, @Param('id') id: string) {
    return await this.orderService.updateOrderStatus(status, id);
  }
}
