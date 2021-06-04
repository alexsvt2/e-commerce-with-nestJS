import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(otp: string , email:string) {
   

    await this.mailerService.sendMail({
      to: email.toLowerCase(),
       from: 'info@commaa.com.sa', // override default from
      subject: 'reset password',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        code: otp
      },
    });
  }
}
