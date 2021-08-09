import {  Injectable } from "@nestjs/common";
import {HttpService } from '@nestjs/axios'
import { AxiosRequestConfig } from "axios";
import { product } from "src/types/product";
import { Invoice } from "src/types/invoice";
import datetime from "date-and-time";
import { Order } from "src/types/order";
import { CreateProductDTO } from "src/product/product.dto";


@Injectable()
export class QoyoudService {

    constructor(private httpService: HttpService) {}

    async createContact(name:string , email:string) {
        var data ={
            "contact": {
              "name": name,
              "email": email,
              "status": "Active"
            }
          };
          
          var config:AxiosRequestConfig = {
            headers: { 
              'API-KEY': '051980ddb04b1f83c0944aa92', 
              'Content-Type': 'application/json'
            }
          };
        const result =  await this.httpService.post("https://www.qoyod.com/api/2.0/customers",data,config).toPromise()
        return result.data.contact
    }

    async createInvoice(QoyoudUserId: any ,reference:string,invoice: Invoice, order:Order) {

        let items:any[] = []
        order.products.forEach(product =>{
            let prod = 
                {
                    "product_id": parseInt(product.orginalProduct.qoyoudId),
                    "quantity": product.qtyOfProduct,
                    "unit_price":product.orginalProduct.price,
                    "discount": invoice.withDiscount,
                    "discount_type": "amount",
                  }
                  items.push(prod)
            
        })
        
        var data = {
            "invoice": {
                "contact_id": QoyoudUserId,
                "reference": reference,
                "issue_date": this.convert(invoice.createDate),
                "due_date":  this.convert(invoice.createDate),
                "status": "Approved",
                "inventory_id": 1,
                "line_items":items
              }
          };
          
          var config:AxiosRequestConfig = {
            headers: { 
              'API-KEY': '051980ddb04b1f83c0944aa92', 
              'Content-Type': 'application/json'
            }
          };
         const result = await this.httpService.post("https://www.qoyod.com/api/2.0/invoices",data,config).toPromise()

         return result
    }

    async createCategory(name:string) {
        var data ={
            "category": {
                "name": name
              }
          };
          
          var config:AxiosRequestConfig = {
            headers: { 
              'API-KEY': '051980ddb04b1f83c0944aa92', 
              'Content-Type': 'application/json'
            }
          };
        const result =  await this.httpService.post('https://www.qoyod.com/api/2.0/categories',data,config).toPromise();
          return result.data.category
    }

    async createProduct(product: CreateProductDTO , categoryId:string,newSequenceId:string) {
      if(!categoryId){
        categoryId = "34"
      }
        var data = {
            "product": {
                "sku": newSequenceId,
                "name_ar":product.productName.ar,
                "name_en": product.productName.en,
                "product_unit_type_id": "6",
                "category_id":categoryId,
                "purchase_item": "0",
                "sale_item": "1",
                "selling_price":product.price.toString(),
                "sales_account_id": "17",
                "tax_id": "1"
          }};
          
          var config:AxiosRequestConfig = {
            headers: { 
              'API-KEY': '051980ddb04b1f83c0944aa92', 
              'Content-Type': 'application/json'
            }
          };
          console.log(data)
        const result = await this.httpService.post('https://www.qoyod.com/api/2.0/products/',data,config).toPromise()
        return result.data.product
    }

    
   convert(newDate){
    let current_datetime = new Date(newDate)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
  }
}