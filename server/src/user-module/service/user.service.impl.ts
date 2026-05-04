import { Inject, Injectable } from "@nestjs/common";
import AbstractCrudService from "src/core/service/abstract.crud.service";
import User from "../model/user.entity";
import UserServiceInterface from "./user.service.interface";
import { USER_REPOSITORY } from "../repository/user.repository.token";
import type UserRepositoryInterface from "../repository/interface/user.repository.interface";
import { DeepPartial } from "typeorm";
import { ServiceValidateBuilder } from "src/core/validation/service.validate.builder";
import * as argon2 from "argon2";


@Injectable()
export default class UserServiceImpl extends AbstractCrudService<User> implements UserServiceInterface {
    
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryInterface) {
        super(userRepository)
    }

    validate(data: DeepPartial<User>) {
        ServiceValidateBuilder.create()
        .fieldNotEmpty(data.email, "email")
        .fieldNotEmpty(data.password, "password")
        .throwIfInvalid()
    }

    async beforeSave(data: DeepPartial<User>): Promise<void> {
        if(data.password){
            data.password = await argon2.hash(data.password)
        }
    }

}