import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PassportModule.register({}),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
