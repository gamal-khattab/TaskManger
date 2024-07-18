import { Controller, Post, Body, ValidationPipe , HttpException,ConflictException ,HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return { success: true, data: result };
    } catch (error:any) {
      if (error instanceof ConflictException) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      return { success: false, message: error.message };
    }
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
    
      return { success: true, data: result };
    } catch (error:any) {
      
      return { success: false, message: error.message };
    }
  }
}
