import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { sign } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { MailService } from 'src/mail/mail.service';

import { UserService } from 'src/shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private mailService: MailService
  ) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async resetPassword(email:string) {

    var digits = '0123456789';

    var otpLength = 4;

    var otp = '';

    for(let i=1; i<=otpLength; i++)

    {

        var index = Math.floor(Math.random()*(digits.length));

        otp = otp + digits[index];

    }

    await this.userService.addOtp(email.toLowerCase(),otp)

    return await this.mailService.sendUserConfirmation(otp,email)
  }

  async verifyOtp(otp:string,payload: Payload) {
    const user = await this.userService.findByPayload(payload)

    if(user.otp === otp) {
      return true ;
    }
    else{
      return false 
    }
  }
}
