import * as nodemail from 'nodemailer';

interface SendSettings {
  // target email
  email: string;
  // The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
  html: string;
  // The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
  text: string;
  subject?: string;
}

export class EmailTool {
  private server;

  constructor() {
    const { EMAIL_SMTP_SERVER, EMAIL_USER, EMAIL_TK, EMAIL_PORT } = process.env;
    this.server = nodemail.createTransport({
      port: EMAIL_PORT,
      host: EMAIL_SMTP_SERVER,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_TK,
      },
    });
  }

  async send(sendSettings: SendSettings) {
    const { EMAIL_ALIAS, EMAIL_USER } = process.env;
    const { email, subject = 'no subject', html, text } = sendSettings;

    const options = {
      from: `${EMAIL_ALIAS}<${EMAIL_USER}>`,
      to: email,
      subject,
      text,
      html,
    };

    await new Promise((resolve, reject) => {
      this.server.sendMail(options, (error, info) => {
        if (error) {
          reject({
            error,
            message: '邮件发送失败',
          });
        } else {
          resolve({
            info,
            message: '邮件发送成功',
          });
        }
      });
    });
  }
}
