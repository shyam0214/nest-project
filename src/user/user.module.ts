import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './schema/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({ secret: "test" })
  ],
  providers: [UserService],
  exports: [UserService],
 
})
export class UserModule {}
