import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokens(userId: number, username: string) {
    const payload = { userId: userId, role: username };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'test',
      expiresIn: '15m',
    });

    return {
      accessToken,
    };
  }
}
