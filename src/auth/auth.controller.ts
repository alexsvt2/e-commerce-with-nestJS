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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async addNewAddress(@Body() address: Address, @Request() req) {
    return await this.userService.addNewAddress(address, req.user._id);
  }

  @Get('/getUserProfile')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
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

  // payment
  @Post('/tokenPayment')
  async tokenPaymnet() {
    // const requestBody = {
    //   card: {
    //     number: 5123450000000008,
    //     exp_month: 12,
    //     exp_year: 21,
    //     cvc: 124,
    //     name: 'test user',
    //     address: {
    //       country: 'Kuwait',
    //       line1: 'Salmiya, 21',
    //       city: 'Kuwait city',
    //       street: 'Salim',
    //       avenue: 'Gulf',
    //     },
    //   },
    //   client_ip: '192.168.1.20',
    // };

    // const options = {
    //   method: 'POST',
    //   url: 'https://api.tap.company/v2/tokens',
    //   headers: { authorization: 'Bearer sk_test_ZpizH89du6SB3X2tkaoDrMyv' },
    //   body: requestBody,
    // };

    // request.Request(options, async function (error, response, body) {
    //   if (error) throw new Error(error);
    //   body = JSON.parse(body);
    //   console.log(body);
    //   return body;
    // });

    return await this.authService.tokenPaymnet();
  }
}
