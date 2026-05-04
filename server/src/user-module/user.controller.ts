import { Controller, Inject, Post } from '@nestjs/common';
import AbstractCrudController from 'src/core/controller/abstract.crud.controller';
import User from './model/user.entity';
import CreateUserDTO from './model/dto/create.user.dto';
import { USER_SERVICE } from './service/user.service.token';
import type UserServiceInterface from './service/user.service.interface';
import UpdateUserDTO from './model/dto/update.user.dto';
import ResponseUserDTO from './model/dto/response.user.dto';

@Controller('user')
export default class UserController extends AbstractCrudController<User,CreateUserDTO, UpdateUserDTO, ResponseUserDTO> {
  
    constructor(@Inject(USER_SERVICE) private readonly userService: UserServiceInterface) {
        super(userService);
    }

    protected toResponse(entity: User): ResponseUserDTO {
        return new ResponseUserDTO(entity.id,entity.email)
    }
    
}