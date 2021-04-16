import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { OrderingService } from '../shared/ordering.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';
import { UpdateInvoiceDTO } from './invoice.dto';
import { Invoice } from 'src/types/invoice';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  //@UseGuards(AuthGuard('jwt') , AdminGuard)
  async getAllOrders(@Query() query: any) {
    const { perPage, page, ...restQuery } = query;
    return await this.invoiceService.getAll(page, perPage, restQuery);
  }

  @Put('/update/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateProduct(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: string,
    @Body() invoice: UpdateInvoiceDTO,
  ): Promise<Invoice> {
    return await this.invoiceService.update(id, invoice);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  deleteProduct(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.delete(id);
  }
}
