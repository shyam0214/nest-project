import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  dob: string;

  @Column({default:false})
  isLogin: boolean;
}
