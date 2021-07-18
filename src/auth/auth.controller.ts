/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Payload } from '../types/payload';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';
import { ApiTags } from '@nestjs/swagger';
import { Address } from 'src/types/user';
import { request } from 'request';
import { Request } from '@nestjs/common';
import { QoyoudService } from 'src/shared/qoyoud.service';

@ApiTags('signUp-signIn')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private qoyiudService: QoyoudService
  ) {}


  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async registertionUser(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Put('/addNewAddress')
  @UseGuards(AuthGuard('jwt'))
  async addNewAddress(@Body() address: Address, @Request() req) {
    return await this.userService.addNewAddress(address, req.user._id);
  }

  @Put('/addNewMobileToken')
  //@UseGuards(AuthGuard('jwt'))
  async addNewMobileToken(@Body() mobileToken: any, @Request() req) {
    
    return await this.userService.addUserMobileToken(mobileToken.mobileToken, '609af645d808b0d8b4eae6ec');
  }

  @Get('/getUserProfile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Request() req) {
    return await this.userService.getUserProfile(req.user._id);
  }

  @Get('getUsers')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async getUsers(@Query() query: any) {
    const { perPage, page, ...restQuery } = query;

    const users = this.userService.findAllusers(page, perPage, restQuery);
    return users;
  }

  @Post('/sendOtp')
  async sendOtp(@Body('email') email:string) {
    return await this.authService.resetPassword(email) ; 
  }

  @Get('/verfyOtp')
  async verfyOtp(@Query('email') email:string , @Query('otp') otp:string) {
    const payload: Payload = {
      email: email,
      isAdmin:false
    };
    return await this.authService.verifyOtp(otp,payload) ; 
  }

  @Post('/changePassword')
  async changePassword(@Body() body:any) {
    return await this.userService.changePassword(body) ; 
  }

  @Post('/sendToAllUsersNotifications')
  async sendNotifications(@Body() body:any) {
    let tokens:string[] = [];
    const users = await this.userService.findAllusersWithoutPages();
  
    users.forEach(user =>{
      if(user.mobileToken){
        tokens.push(user.mobileToken)
      }
    })
    
    return await this.userService.sendNotifications(body.title , body.body , tokens)
  }

}
