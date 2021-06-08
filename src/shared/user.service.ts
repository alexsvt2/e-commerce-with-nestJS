/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, User } from 'src/types/user';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // create new user
  async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    email.toLowerCase();
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    userDTO.email.toLowerCase();
    userDTO.isGuest = false;
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return createdUser;
  }

  async getUserProfile(id: string) {
    return await this.userModel.findById(id);
  }

  async addNewAddress(address: Address, userId: string) {
    const user = await this.userModel.findById(userId);
    user.address.push(address);
    await user.save();
    return user;
  }
  // login

  async findByLogin(userDTO: LoginDTO) {
    const { email, password, phoneNumber } = userDTO;
    email.toLowerCase();
    const user = await this.userModel
      .findOne({'email':email})
      .select('fullName password email createDate address phoneNumber isAdmin');

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {

      return user;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  //  get all users
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async findAllusers(page: number = 1, perPage: number = 10, query: any) {
    const pageNo = Number(page);
    const size = Number(perPage);
    const queryPage = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const users = await this.userModel.find(query, {}, queryPage);
    const userCount = await this.userModel.count();
    const totalPages = Math.ceil(userCount / size);
    return { users, totalPages };
  }

  async addOtp(email:string , otp:string){
    const user = await this.userModel.updateOne(
      { email: email },
      {
        $set: { otp: otp },
      },
    );

    return user ;
  }

  // reset password 
  async changePassword(body: any) {
    let newPassword = body.newPassword;
  let confirmNewPaassword = body.confirmNewPaassword;
  let email = body.email;
  

  if (newPassword == confirmNewPaassword) {
      const user = await this.userModel.findOne({ email: email });
      console.log(user)
      if (user != null) {
        try {
          const salt = await bcrypt.genSalt();
         
          const hashPassword = await bcrypt.hash(
            newPassword,
            salt,
            async (error, hash) => {
              if (error) return error;
              user.password = newPassword
              console.log(user.password)

             
              return await user.save()
            }
          )
     
          // res.status(200).send('The password has been changed');
        } catch (e) {
          throw new HttpException('somthing wrong !', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

      }
    
  }
}
  // find by filter
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async findAllusersFilter(page: any, filterBody: any) {
    const filter = filterBody;
    const pageNo = page.page;
    const size = 10;
    const query = {
      skip: size * (pageNo - 1),
      limit: size,
    };

    const users = await this.userModel.find(filter, {}, query);
    const userCount = users.length;
    const totalPages = Math.ceil(userCount / size);
    return { users, totalPages };
  }

}
