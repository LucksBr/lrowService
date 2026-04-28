import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './model/user.entity';
import { USER_REPOSITORY } from './repository/user.repository.token';
import UserRepositoryTypeOrmImpl from './repository/implementations/user.repository.typeorm.impl';
import { USER_SERVICE } from './service/user.service.token';
import UserServiceImpl from './service/user.service.impl';
import UserController from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepositoryTypeOrmImpl },
    { provide: USER_SERVICE, useClass: UserServiceImpl },
  ],
  exports: [USER_SERVICE],
  controllers: [UserController],
})
export default class UserModule {}
