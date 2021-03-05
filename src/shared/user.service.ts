/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    // create new user
    async create(userDTO: RegisterDTO) {
        const { email } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    // login 

    async findByLogin(userDTO: LoginDTO) {
        const { email, password, phoneNumber } = userDTO;
        const user = await this.userModel
            .findOne({ $or: [{ email }, { phoneNumber }] })
            .select('fullName password email createDate address phoneNumber isAdmin');  

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }


    async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
      }

      //  get all users
      async findAllusers() {
          const users = await this.userModel.find({'isAdmin':false});
          return users;
      }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized["password"];
        return sanitized;
        // return user.depopulate('password');
    }

}
