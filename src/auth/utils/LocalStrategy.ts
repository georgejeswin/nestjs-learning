import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      // To change field for username
      // usernameField: 'email',
    });
  }

  async validate(username: string, password: string) {
    console.log('Inside local strategy');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
