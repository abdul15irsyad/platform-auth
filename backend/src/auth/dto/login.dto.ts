import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
