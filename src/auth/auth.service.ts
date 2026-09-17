import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

import { AuthResponseDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.getOrThrow<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async singIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserName(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: foundUser.id,
      username: foundUser.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
}
