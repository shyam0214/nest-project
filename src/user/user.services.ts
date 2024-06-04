import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './schema/user.entity';
import { Repository } from 'typeorm';
import { user } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: user): Promise<UserEntity> {
    const userData = await this.userRepository.save(user);
    return userData;
  }

  async generateToken(user: UserEntity): Promise<object> {
    const payload = { username: user.username, id: user.id };
    return payload;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const userData = await this.userRepository.findOne({ where: { username } });
    return userData;
  }

  async isLoginUserUpdate(id: number): Promise<UserEntity | null> {
    const userData = await this.userRepository.findOne({ where: { id:id } });
    if (!userData) {
        throw new Error('Task not found');
      }
      userData.isLogin = true
      return await this.userRepository.save(userData);
  }
  
  async findLoginUser(): Promise<UserEntity | any> {
    const userData = await this.userRepository.findAndCount({ where: { isLogin:true } });
      return userData;
  }
}

