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

@ApiTags('signUp-signIn')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
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

}
