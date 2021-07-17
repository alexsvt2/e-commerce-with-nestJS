import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from 'src/types/invoice';
import { product } from 'src/types/product';
import { InvoiceDto, UpdateInvoiceDTO } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(@InjectModel('Invoices') private invoiceModel: Model<Invoice>) {}

  async create(invoiceDto: InvoiceDto) {
    // check if this order have previos invoices
    const preInvoice = await this.invoiceModel.findOne({
      order: invoiceDto.order._id,
    });

    if (!preInvoice) {
   
      const invoice = await this.invoiceModel.create({
        ...invoiceDto,
      });
      await invoice.save();
      return invoice;
    } else {
      return preInvoice;
    }
  }

  async findById(id: string) {
    const invoice = await this.invoiceModel.findById(id).populate('order user');
    return invoice;
  }

  async getAll(page: number = 1, perPage: number = 10, query: any) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const queryPage = {
      skip: size * (pageNo - 1),
      limit: size,
    };
    let invoices = await this.invoiceModel
      .find(query, {}, queryPage)
      .populate('order user')
      .sort({ createDate: -1 });
    return invoices;
  }

  async update(id: string, invoiceDto: UpdateInvoiceDTO): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id);

    //await invoice.update(invoiceDto);
    return await this.invoiceModel.findById(id).populate('order user');
  }

  async delete(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id);

    await invoice.remove();
    return invoice;
  }

  async createNewSeq() {
      // generate new sequence id
		const orderCount = await this.invoiceModel.countDocuments({});
		let newSequenceId;
		if (orderCount == 0) {
			newSequenceId = (orderCount + 1 + "").padStart(4, "0");
		}else {
			const lastOrder = await this.invoiceModel.find().sort({_id:-1}).limit(1)
			const lastOrderSequenceId = parseInt(lastOrder[0].sequenceId.replace("#", ""))
			newSequenceId = (lastOrderSequenceId + 1 + "").padStart(4, "0");
		}

    return newSequenceId
  }
}
