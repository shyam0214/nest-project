import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.services';
import { user } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<any> {
    const { username, password } = credentials;

    if (!username) {
      return { status: false, error: 'Username is required' };
    }
    if (!password ) {
      return {
        status: false,
        error: 'Password is required and must be at least 6 characters long',
      };
    }

    const user = await this.userService.findByUsername(username);
    if (!user) {
        return {
          status: false,
          error: 'username not found ',
        };
      }
      const usersUpdate = await this.userService.isLoginUserUpdate(user.id)
    const users = await this.userService.findLoginUser()

    return {
      status: true,
      message: 'Login User Get successfully',
      users
    };
  }

  @Post('signup')
  async create(@Body() userDto: user) {
    try {
      const { username, dob, age, gender, password } = userDto;
      
      if (!username || !dob || !age || !gender || !password) {
        return {
          success: false,
          message: 'All fields are required',
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters long',
        };
      }
      const user = await this.userService.findByUsername(username);
      if (user) {
          return {
            status: false,
            error: 'username already  exist try to another username ! ',
          };
        }
      const savedUser = await this.userService.create(userDto);

      const token = this.authService.getTokens(savedUser.id, savedUser.username);

      return {
        success: true,
        message: 'User created successfully',
        data: savedUser,
        token: token.accessToken,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
