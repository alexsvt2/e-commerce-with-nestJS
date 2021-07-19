import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notifyMe } from 'src/types/notifyMe';
import { NotifyMeDto } from './notifyMe.dto';

@Injectable()
export class NotifymeService {

    constructor(
        @InjectModel('notifyUser') private notifyModel: Model<notifyMe>,
      ) {}


      async create(notifyMeDto: NotifyMeDto) {
        const notify = await this.notifyModel.create({ ...notifyMeDto });
        await notify.save();
        return notify;
      }

      async getByProductId(productId : string) {
          const user = await this.notifyModel.find({'product': productId}).populate('user')
          if(user){
            return user
          } else {
            return null
          }
      }
      async deleteAll(productId : string) {
        const users = await this.notifyModel.find({'product': productId})
        users.map(async user =>{
          await this.notifyModel.findOneAndDelete({'product': productId , 'user': user._id})
        })
      }
      }

