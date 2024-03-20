import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from './user/user.entity';
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from './auth.config';
import { JWTType, GrantType } from './auth.controller';

export const hashPassword = (password: string) =>
  hashSync(password, genSaltSync(10));

export const createJWTResponse = ({
  authUser,
  jwtService,
}: {
  authUser: User;
  jwtService: JwtService;
}) => {
  const accessToken = jwtService.sign(
    { id: authUser.id, type: JWTType.ACCESS_TOKEN },
    {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    },
  );
  const refreshToken = jwtService.sign(
    { id: authUser.id, type: JWTType.REFRESH_TOKEN },
    {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    },
  );

  return {
    accessToken: {
      token: accessToken,
      grantType: GrantType.PASSWORD,
    },
    refreshToken: {
      token: refreshToken,
    },
  };
};
