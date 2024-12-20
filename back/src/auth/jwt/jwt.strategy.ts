import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from '../../config-loader';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get(EnvVars.secretKey), // Get the secret key from ConfigService
        ignoreExpiration: false,
      });
  }
  async validate(payload: any): Promise<any> {
    await this.authService.validateUserById(+payload.idUser);
    const idUser = payload.idUser
    return idUser;
  }
}



// const user = await this.authService.validateUserById(payload.sub); // Validates user by ID
//     if (!user) {
//       throw new UnauthorizedException();
//     }