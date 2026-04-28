import BaseCrudRepositoryInterface from 'src/core/repository/base.crud.repository.interface';
import { DeepPartial } from 'typeorm';
import AbstractEntity from '../model/abstract.entity';
import BaseCrudServiceInterface from './base.crud.service.interface';

export default abstract class AbstractCrudService<Entity extends AbstractEntity> implements BaseCrudServiceInterface<Entity> {
    
    constructor(private repository: BaseCrudRepositoryInterface<Entity>) {}

    getById(id: number): Promise<Entity | null> {
        if (!id) throw new Error('O id deve ser informado.')

        return this.getRepository().getById(id)
    }

    listAll(): Promise<Entity[]> {
        return this.getRepository().listAll()
    }

    save(data: DeepPartial<Entity>): Promise<Entity> {
        return this.getRepository().save(data)
    }

    deleteById(id: number): Promise<void> {
        if (!id) throw new Error('O id deve ser informado.')

        return this.getRepository().deleteById(id)
    }

    getRepository() {
        return this.repository
    }
}
