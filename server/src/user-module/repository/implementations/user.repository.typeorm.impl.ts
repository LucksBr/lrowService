import { Injectable } from '@nestjs/common';
import User from 'src/user-module/model/user.entity';
import UserRepositoryInterface from '../interface/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AbstractTypeOrmCrudRepository from 'src/core/repository/abstract.typeorm.crud.repository';

@Injectable()
export default class UserRepositoryTypeOrmImpl extends AbstractTypeOrmCrudRepository<User> implements UserRepositoryInterface {
    
    constructor(@InjectRepository(User) repository: Repository<User>) {
        super(repository);
    }

    findByEmail(email: string): Promise<User | null> {
       return this.getRepository().findOne({ where: {email}});
    }

}