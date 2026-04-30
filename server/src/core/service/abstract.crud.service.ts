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

    validate(data: DeepPartial<Entity>) {}

    beforeSave(data: DeepPartial<Entity>){}

    afterSave(data: Entity) {}

    async save(data: DeepPartial<Entity>): Promise<Entity> {
        this.beforeSave(data)

        this.validate(data)

        const persistedEntity = await this.getRepository().save(data)

        this.afterSave(persistedEntity)

        return persistedEntity
    }

    beforeUpdate(data: DeepPartial<Entity>){}

    afterUpdate(data: Entity) {}

    async update(id: number, data: DeepPartial<Entity>): Promise<Entity> {
        this.beforeUpdate(data)

        this.validate(data)

        const updatedEntity = await this.getRepository().update(id, data)

        this.afterUpdate(updatedEntity)

        return updatedEntity
    }

    deleteById(id: number): Promise<void> {
        if (!id) throw new Error('O id deve ser informado.')

        return this.getRepository().deleteById(id)
    }

    getRepository() {
        return this.repository
    }
}
