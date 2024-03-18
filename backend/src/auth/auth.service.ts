import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { isEmpty } from 'class-validator';
import { IncomingHttpHeaders } from 'http';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  getBearerTokenFromHeaders(headers: IncomingHttpHeaders) {
    const authorization = headers?.authorization;
    if (isEmpty(authorization)) return null;
    if (authorization.split(' ')[0] !== 'Bearer') return null;
    return authorization.split(' ')[1];
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithPassword({ email });
    if (!user || !compareSync(password, user.password)) return null;
    return user;
  }
}
