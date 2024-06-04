import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}




// Make one api for fetching the currently logged in user details which includes username , age , gender and dob.
// take two api for register  and login from your previous project.
// Cayro Shop
// 5:10 PM
// in user schema just add the username, password, dob , gender and age

// cayroshop.db@gmail.com