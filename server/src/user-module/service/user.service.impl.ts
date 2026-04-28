import { Inject, Injectable } from "@nestjs/common";
import AbstractCrudService from "src/core/service/abstract.crud.service";
import User from "../model/user.entity";
import UserServiceInterface from "./user.service.interface";
import { USER_REPOSITORY } from "../repository/user.repository.token";
import type UserRepositoryInterface from "../repository/interface/user.repository.interface";


@Injectable()
export default class UserServiceImpl extends AbstractCrudService<User> implements UserServiceInterface {
    
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryInterface) {
        super(userRepository)
    }

}