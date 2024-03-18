import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'class-validator';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getBearerTokenFromHeaders(headers: IncomingHttpHeaders) {
    const authorization = headers?.authorization;
    if (isEmpty(authorization)) return null;
    if (authorization.split(' ')[0] !== 'Bearer') return null;
    return authorization.split(' ')[1];
  }
}
