import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'MANAGER', 'DEVELOPER'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'MANAGER' | 'DEVELOPER';
}
