import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/types/invoice';
import { Order } from 'src/types/order';
import datetime from "date-and-time";
const easyinvoice = require('easyinvoice');

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(otp: string , email:string) {
   

    await this.mailerService.sendMail({
      to: email.toLowerCase(),
       from: 'info@commaa.com.sa', // override default from
      subject: 'reset password',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        code: otp
      },
    });
  }

  async sendInvoice(invoice: Invoice , order:Order){

    let createdAt =  await this.convert(invoice.createDate)
    let productsArr:any[] = []

    order.products.map(prod =>{
      let prodDetails = {
        "name": prod.productId.productName.ar,
        "quantity": prod.qtyOfProduct,
        "description": prod.productId.description.ar,
        "tax": 15,
        "price": prod.productId.price,
        "total": prod.productId.price * prod.qtyOfProduct
    }
    productsArr.push(prodDetails)
    })


let data = {
  //"documentTitle": "RECEIPT", //Defaults to INVOICE
  "currency": "SAR",
  "taxNotation": "vat", //or gst
  "marginTop": 25,
  "marginRight": 25,
  "marginLeft": 25,
  "marginBottom": 25,
  "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
  //"logoExtension": "png", //only when logo is base64
  "sender": {
      "company": "Commaa Shop",
      "address": "Saudi arabia - Riyadh",
      "zip": "",
      "city": "Riyadh",
      "country": "Saudi Arabia"
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
  },
  "client": {
      "company": invoice.user.fullName,
      "address": order.address.addr1,
      "zip": "",
      "city": order.address.city,
      "country": "Saudi Arabia"
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
  },
  "invoiceNumber": invoice.sequenceId,
  "invoiceDate": createdAt.toString(),
  "products":productsArr,
  "bottomNotice": "."
};

    //Create your invoice! Easy!
// await easyinvoice.createInvoice(data, async function (result) {
//   //The response will contain a base64 encoded PDF file
//  // await easyinvoice.download('myInvoice.pdf', result.pdf);
//  console.log( result.pdf)
// });
  

    await this.mailerService.sendMail({
      to: invoice.user.email.toLowerCase(),
       from: 'info@commaa.com.sa', // override default from
      subject: 'Order invoice',
      template: './invoice', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        invocie: invoice,
        createdAt:createdAt,
        fullName: invoice.user.fullName,
        totalOfInvoice: invoice.totalOfInvoice,
        totalWithTax: invoice.totalWithTax,
        withDiscount: invoice.withDiscount,
        total:invoice.totalWithTax - invoice.withDiscount,
        seqId: invoice.sequenceId,
        products: productsArr
      },
    });
  }

  async convert(newDate){
    let current_datetime = new Date(newDate)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }


}
