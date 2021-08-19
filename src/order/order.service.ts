import { HttpException, HttpStatus,HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/types/order';
import { OrderDto } from './order.dto';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceDto } from '../invoice/invoice.dto';
import { cartProduct } from 'src/types/cart';
import { product } from 'src/types/product';
import { UserService } from 'src/shared/user.service';
import { MailService } from 'src/mail/mail.service';
import { Invoice } from 'src/types/invoice';
import { QoyoudService } from 'src/shared/qoyoud.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Orders') private orderModel: Model<Order>,
    @InjectModel('Product') private productModel: Model<product>,
    //@InjectModel('Invoice') private invoiceModel: Model<Invoice>,
    private userService: UserService,
    private httpService: HttpService,
    private invoiceService: InvoiceService,
    private mailService: MailService,
    private qoyoudService: QoyoudService
  ) {}

  async temp(invoice: string , order: string) {
    const ord = await this.orderModel.find().populate("products.productId")

    const inv = await this.invoiceService.findById(ord[50].invoice)
     
    return await this.mailService.sendInvoice(inv, ord[50])
  }
  async create(
    orderDto: OrderDto,
    userId: string,
    amount: number,
    amountWithTax: number,
    coupon: boolean , 
    discount: number,
    couponName:string
  ) {
    orderDto.user = userId;
    // add this order to DB and save
    const order = await this.orderModel.create({ ...orderDto });
    const userSelected = await this.userService.getUserProfile(userId)
    //calculate orginal price 
    for (let i =0 ; i< orderDto.products.length ; i++) {
      order.products[i].orginalProduct = await this.productModel.findById(orderDto.products[i].productId )
   
    }
    await order.save();

    // calculate and create  invoice
    let invoiceDto = new InvoiceDto();
    let newSeq = await this.invoiceService.createNewSeq()
  

    invoiceDto = {
      totalOfInvoice: amount,
      totalWithTax: amountWithTax,
      order: order._id,
      user: userId,
      withCoupon: coupon,
      couponName: couponName,
      withDiscount: discount,
      sequenceId:newSeq,
      isGift: orderDto.isGift
    };
    
    const invoice = await this.invoiceService.create(invoiceDto);

    // save the invoice id at order obj
    order.invoice = invoice._id;
    await order.save();
    await invoice.populate("user").execPopulate();
    
    let QoyoudUserId
    //check if this user regestered in qoyoud or not
    if(!userSelected.qoyoudId || userSelected.qoyoudId === null) {
      this.qoyoudService.createContact(userSelected.fullName , userSelected.email).then(async result =>{
       
        QoyoudUserId = result.id
        userSelected.qoyoudId = result.id
        userSelected.save()
        //await this.qoyoudService.createInvoice(QoyoudUserId , newSeq , invoice , order)
      })
  
    } else{
      QoyoudUserId = userSelected.qoyoudId
      //await this.qoyoudService.createInvoice(QoyoudUserId , newSeq , invoice , order)
    }
   
    
    //await this.mailService.sendInvoice(invoice, order)

    // claculate the new qty of each product
  //  await this.calculateNewQtyOfProducts(orderDto.products);
    // finish
    return order;
  }

  async calcuuulate(orderId:string) {
    const order = await this.orderModel.findById(orderId)
    //calculate orginal price 
    for (let i =0 ; i< order.products.length ; i++) {
      order.products[i].orginalProduct = await this.productModel.findById(order.products[i].productId )
   
    }
    await order.save()
    return true ;
  }
  async calculateNewQtyOfProducts(products: cartProduct[]) {
    for (let i = 0; i < products.length; i++) {
      let product ;
      // get the qty of each product
      let productQty = await this.productModel.findById(products[i].productId);

      if(productQty.variants.length === 0 ){
     
  
         product = await this.productModel.findOneAndUpdate(
          {
            _id: products[i].productId
          },
          {
            $set: {
              qty: productQty.qty - products[i].qtyOfProduct
            },
          },
        );
        if(product.qty === 0){
          this.mailService.sendNotfyToAdmin(product.productName.en,"All Variants")
          }
        // product.qty = product.qty - products[i].qtyOfProduct;
      }else{
        let q1 = productQty.variants;
       
        let varQty = q1.find(x => String(x._id) === products[i].variant.variants[0]._id)
       
      //  console.log(q1)
        console.log(products[i])

  //console.log(typeof products[i].variantIdOfProduct)
  
         product = await this.productModel.findOneAndUpdate(
          {
            _id: products[i].productId,
            'variants._id': products[i].variantIdOfProduct,
          },
          {
            $set: {
              qty: productQty.qty - products[i].qtyOfProduct,
              'variants.$.qty':{$inc : -products[i].qtyOfProduct} 
            },
          },{new:true}
        );
        
        if(product.qty === 0){
        this.mailService.sendNotfyToAdmin(product.productName.en,"All Variants")
        }
        else {
          let updatedVariant = product.variants.find(x => x.qty === 0)
          if(updatedVariant)
          this.mailService.sendNotfyToAdmin(product.productName.en,"Please update this product qty")
        }
      }
  
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
    const ordersCount = await this.orderModel.count({'user._id':userId});
    const totalPages = Math.ceil(ordersCount / size);
    return { orders, totalPages };
  }

  async getById(id: any): Promise<Order> {
    return await this.orderModel
      .findById(id)
      .populate('user invoice products.productId shippingMethod');
  }

  async updateOrderStatus(status: string, id: string) {
    const today: Date = new Date(Date.now());
    const order = await this.orderModel.updateOne(
      { _id: id },
      {
        $set: { status: status ,updateStatusDate:today},
      },
    );

    const orderGet = await this.orderModel.findById(id).populate('user')
    let userToken:any[] = []
      userToken.push(orderGet.products)
      if(userToken[0].mobileToken){
        //console.log(userToken[0].mobileToken)
        await this.userService.sendNotifications("Order Status " , `your order now is ${status}` 
        , [userToken[0].mobileToken])
      }




      // Qouyoud invoice
      if(status === "delivered"){
        await this.calculateNewQtyOfProducts(orderGet.products);
        let QoyoudUserId;
        const user = await this.userService.getUserProfile(orderGet.user);
        if(!user.qoyoudId || user.qoyoudId === null) {
          this.qoyoudService.createContact(user.fullName , user.email).then(async result =>{
       
            QoyoudUserId = result.id
            user.qoyoudId = result.id
            user.save()
            
            //await this.qoyoudService.createInvoice(QoyoudUserId , newSeq , invoice , order)
          })
        } else{
          QoyoudUserId = user.qoyoudId
        }
        const invoice = await this.invoiceService.findById(orderGet.invoice)
        await this.qoyoudService.createInvoice(QoyoudUserId , invoice.sequenceId , invoice , orderGet)
      }



    return order;
  }

 async getAllOrdersForExport() {
  const orders = await this.orderModel
  .find()
  .populate('user invoice products.productId shippingMethod')
  .sort({ createDate: -1 });

  return orders
 }
  
  async verfyChargePayment(data:string , orderId: string) {

    if (data == "CAPTURED") {
      this.updateOrderStatus('Approved',orderId)
    }else {
      this.updateOrderStatus('Rejected',orderId)
       throw new HttpException('Invalid cahrge Id', HttpStatus.UNAUTHORIZED);

    }
  }
}
