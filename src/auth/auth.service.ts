import { Injectable, UnauthorizedException , InternalServerErrorException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inject ConfigService for environment variables

  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    try{
    const user = await this.usersService.findByCredentials(loginDto);
    console.log(user); 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    else{
      const payload = { username: user.username,email:user.email};
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

    
    return { user ,token};
    }
    }
    catch (error) {
      // Handle errors appropriately
      console.error('Error generating access token:', error);
      throw new InternalServerErrorException('Failed to generate access token');    }
  }

  // private generateToken(user: any) {
  //   const payload = { username: user.username, sub: user._id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  async generateToken(payload: any): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { secret });
     // Ensure JWT service is initialized with process.env.JWT_SECRET
  }
}
