import { HttpException, HttpStatus,HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/types/order';
import { OrderDto } from './order.dto';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceDto } from '../invoice/invoice.dto';
import { cartProduct } from 'src/types/cart';
import { product } from 'src/types/product';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private orderModel: Model<Order>,
    @InjectModel('Product') private productModel: Model<product>,
    private httpService: HttpService,
    private invoiceService: InvoiceService,
  ) {}

  async create(
    orderDto: OrderDto,
    userId: string,
    amount: number,
    amountWithTax: number,
    coupon: boolean , 
    discount: number
  ) {
    orderDto.user = userId;
    // add this order to DB and save
    const order = await this.orderModel.create({ ...orderDto });

    // calculate orginal price 
    for (let i =0 ; i< orderDto.products.length ; i++) {
      order.products[i].orginalProduct = await this.productModel.findById(order.products[i].productId )
   
    }
    await order.save();

    // calculate and create  invoice
    let invoiceDto = new InvoiceDto();

    invoiceDto = {
      totalOfInvoice: amount,
      totalWithTax: amountWithTax,
      order: order._id,
      user: userId,
      withCoupon: coupon,
      withDiscount: discount,
    };
    console.log(invoiceDto)
    const invoice = await this.invoiceService.create(invoiceDto);

    // save the invoice id at order obj
    order.invoice = invoice._id;
    await order.save();


    // claculate the new qty of each product
    await this.calculateNewQtyOfProducts(orderDto.products);
    // finish
    return order;
  }

  async calculateNewQtyOfProducts(products: cartProduct[]) {
    for (let i = 0; i < products.length; i++) {
      // get the qty of each product
      let productQty = await this.productModel.findById(products[i].productId);
      let q1 = productQty.variants;

      let varQty = q1.find(x => x._id == products[i].variant._id)

      let product = await this.productModel.updateOne(
        {
          _id: products[i].productId,
          'variants._id': products[i].variant._id,
        },
        {
          $set: {
            qty: productQty.qty - products[i].qtyOfProduct,
            'variants.$.qty':varQty.qty - products[i].qtyOfProduct
          },
        },
      );
      //  product.qty = product.qty - products[i].qtyOfProduct;
    }
  }

  async getOrders(page = 1, perPage = 10, query: any) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const queryPage = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const orders = await this.orderModel
      .find(query, {}, queryPage)
      .populate(' invoice products.productId shippingMethod')
      .populate('user', '-isAdmin')
      .sort({ createDate: -1 });
    const ordersCount = await this.orderModel.count(query);
    const totalPages = Math.ceil(ordersCount / size);
    return { orders, totalPages };
  }

  async getOrdersByUserId(page = 1, perPage = 10, userId: string) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const queryPage = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const orders = await this.orderModel
      .find({'user':userId})
      .populate('user invoice products.productId shippingMethod')
      .sort({ createDate: -1 });
    const ordersCount = await this.orderModel.count({'user':userId});
    const totalPages = Math.ceil(ordersCount / size);
    return { orders, totalPages };
  }

  async getById(id: any): Promise<Order> {
    return await this.orderModel
      .findById(id)
      .populate('user invoice products.productId shippingMethod');
  }

  async updateOrderStatus(status: string, id: string) {
    const order = await this.orderModel.updateOne(
      { _id: id },
      {
        $set: { status: status ,updateStatusDate:Date.now()},
      },
    );

    return order;
  }

  
  async verfyChargePayment(chargeId:string , orderId: string) {

    const headers = {
      authorization: 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ',
      'content-type': 'application/json',
    };

    const dd = await this.httpService
      .get(
        "https://api.tap.company/v2/charges/"+chargeId ,
    
        {
          headers: headers,
        },
      )
      .subscribe(async (result) => {
        if (result.data.status == "CAPTURED") {
          this.updateOrderStatus('Approved',orderId)
        }else {

           throw new HttpException('Invalid cahrge Id', HttpStatus.UNAUTHORIZED);

        }
      });
  }
}
