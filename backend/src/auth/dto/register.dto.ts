import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateBy,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({ minSymbols: 0 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateBy({
    name: 'matchPassword',
    validator: {
      validate: (value, { object }) =>
        value === (object as RegisterDto).password,
    },
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
