import { HttpModule, Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [SharedModule, HttpModule,MailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
