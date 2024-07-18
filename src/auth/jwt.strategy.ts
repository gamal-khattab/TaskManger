import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { emitKeypressEvents } from 'readline';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    try {
      // Check if payload is a plain object and has necessary properties
      if (typeof payload !== 'object' || Array.isArray(payload) || !payload.sub || !payload.username) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Optionally, perform additional checks or database queries here
      // For example, check if the user exists in the database using payload.sub

      return { username: payload.username, password: payload.password , email:payload.email };
    } catch (error:any) {
      throw new UnauthorizedException('Unauthorized', error.message);
    }
  }
}
