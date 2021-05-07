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
    return await this.orderService.getOrders(page, perPage, req.user._id);
  }

  @Get(':id')
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Post('/verfyCharge/:chargeId/:orderId')
  @UseGuards(AuthGuard('jwt') )
  async verfyCharge(@Param('chargeId') chargeId: string,@Param('orderId') orderId: string) {
    return await this.orderService.verfyChargePayment(chargeId,orderId);
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
      orderDto.discount
    );
  }
  @Put('/:id')
  async updateOrder(@Body('status') status: string, @Param('id') id: string) {
    return await this.orderService.updateOrderStatus(status, id);
  }
}
