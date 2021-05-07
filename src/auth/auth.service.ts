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
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

}
