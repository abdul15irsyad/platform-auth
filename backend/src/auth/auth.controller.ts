import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { isEmpty } from 'class-validator';
import { compareSync } from 'bcrypt';
import { hashPassword } from './auth.util';
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from './auth.config';
import { Request } from 'express';
import { LoginDto, RegisterDto } from './dto';

export enum JWTType {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

export enum GrantType {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh-token',
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginInput: LoginDto) {
    try {
      const { email, password } = loginInput;
      const authUser = await this.userService.findOne({
        select: {
          id: true,
          password: true,
        },
        where: { email: email },
      });
      if (isEmpty(authUser) || !compareSync(password, authUser?.password)) {
        // prevent response time vulnerability
        if (isEmpty(authUser)) hashPassword(password);
        throw new UnauthorizedException('Email or password is incorrect');
      }
      // create json web token
      const accessToken = this.jwtService.sign(
        { id: authUser.id, type: JWTType.ACCESS_TOKEN },
        {
          expiresIn: ACCESS_TOKEN_EXPIRED,
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: authUser.id, type: JWTType.REFRESH_TOKEN },
        {
          expiresIn: REFRESH_TOKEN_EXPIRED,
        },
      );

      return {
        accessToken: {
          token: accessToken,
          // expiresIn: ACCESS_TOKEN_EXPIRED,
          grantType: GrantType.PASSWORD,
        },
        refreshToken: {
          token: refreshToken,
          // expiresIn: REFRESH_TOKEN_EXPIRED,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    try {
      // get bearer token
      const token = this.authService.getBearerTokenFromHeaders(req?.headers);
      if (isEmpty(token)) throw new UnauthorizedException();

      const payload = this.jwtService.verify(token);
      if (payload.type !== JWTType.REFRESH_TOKEN) {
        throw new UnauthorizedException('The token is not refresh token');
      }

      // create json web token
      const newAccessToken = this.jwtService.sign(
        { id: payload.id, type: JWTType.ACCESS_TOKEN },
        {
          expiresIn: ACCESS_TOKEN_EXPIRED,
        },
      );
      const newRefreshToken = this.jwtService.sign(
        { id: payload.id, type: JWTType.REFRESH_TOKEN },
        {
          expiresIn: REFRESH_TOKEN_EXPIRED,
        },
      );

      return {
        accessToken: {
          token: newAccessToken,
          // expiresIn: ACCESS_TOKEN_EXPIRED,
          grantType: GrantType.REFRESH_TOKEN,
        },
        refreshToken: {
          token: newRefreshToken,
          // expiresIn: REFRESH_TOKEN_EXPIRED,
        },
      };
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          code: 'TOKEN_EXPIRED',
          message: 'token expired',
        });
      throw new InternalServerErrorException(error);
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const newUser = await this.userService.create({
        ...registerDto,
        password: hashPassword(registerDto.password),
      });

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}