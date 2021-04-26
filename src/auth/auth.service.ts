import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { sign } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { UserService } from 'src/shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async tokenPaymnet() {
    const headers = {
      authorization: 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ',
      'content-type': 'application/json',
    };

    const dd = await this.httpService
      .post(
        'https://api.tap.company/v2/tokens',
        {
          card: {
            number: 5123450000000008,
            exp_month: 12,
            exp_year: 21,
            cvc: 124,
            name: 'test user',
            address: {
              country: 'Kuwait',
              line1: 'Salmiya, 21',
              city: 'Kuwait city',
              street: 'Salim',
              avenue: 'Gulf',
            },
          },
          client_ip: '192.168.1.20',
        },
        {
          headers: headers,
        },
      )
      .subscribe(async (result) => {
        console.log('ssss' + result.data.id);
        this.httpService
          .post(
            'https://api.tap.company/v2/charges',
            {
              amount: 1,
              currency: 'SAR',
              threeDSecure: true,
              save_card: true,
              description: 'Test Description',
              statement_descriptor: 'Sample',
              metadata: {
                udf1: 'test 1',
                udf2: 'test 2',
              },
              reference: {
                transaction: 'txn_0001',
                order: 'ord_0001',
              },
              receipt: {
                email: false,
                sms: true,
              },
              customer: {
                first_name: 'test',
                middle_name: 'test',
                last_name: 'test',
                email: 'test@test.com',
                phone: {
                  country_code: '965',
                  number: '50000000',
                },
              },
              merchant: {
                id: '',
              },
              source: {
                id: 'src_all',
              },
              post: {
                url: 'http://your_website.com/post_url',
              },
              redirect: {
                url: 'http://your_website.com/redirect_url',
              },
            },
            {
              headers: headers,
            },
          )
          .subscribe(async (chargeResult) => {
            console.log(chargeResult.data);
            return chargeResult.data;
          });
      });
  }
}
