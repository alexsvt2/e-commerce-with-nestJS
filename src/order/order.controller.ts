import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt') , AdminGuard)
  async getAllOrders(@Query() query: any) {
    const { perPage, page, ...restQuery } = query;
    return await this.orderService.getOrders(page, perPage, restQuery);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt') )
  async getAllUserOrders(@Query() query: any , @Request() req) {
    const { perPage, page, ...restQuery } = query;
    return await this.orderService.getOrdersByUserId(page, perPage, req.user._id);
  }

  @Get(':id')
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Post('/calll')
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async Callll(@Body('id') id:string) {
    console.log('dddd')
    return await this.orderService.calcuuulate(id);
  }

  @Post('/verfyCharge/:orderId')
  async verfyCharge(@Body() body,@Param('orderId') orderId: string) {
    console.log(body)
    return await this.orderService.verfyChargePayment(body.status,orderId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt') )
  async createOrder(
    @Body() orderDto: any,
    @Request() req
  ) {
    
    return await this.orderService.create(
      orderDto,
      req.user._id,
      orderDto.amount,
      orderDto.amountWithTax,
      orderDto.coupon,
      orderDto.discount,
      orderDto.couponName
    );
  }
  @Put('/:id')
  async updateOrder(@Body('status') status: string, @Param('id') id: string) {
    return await this.orderService.updateOrderStatus(status, id);
  }
}
