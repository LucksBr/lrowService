import BaseCrudRepositoryInterface from 'src/core/repository/base.crud.repository.interface';
import { DeepPartial } from 'typeorm';
import AbstractEntity from '../model/abstract.entity';
import BaseCrudServiceInterface from './base.crud.service.interface';
import { ServiceException } from '../exceptions/service.exception';

export default abstract class AbstractCrudService<Entity extends AbstractEntity> implements BaseCrudServiceInterface<Entity> {
    
    constructor(private repository: BaseCrudRepositoryInterface<Entity>) {}

    getById(id: number): Promise<Entity> {
        return this.getByIdOrFail(id)
    }

    listAll(): Promise<Entity[]> {
        return this.getRepository().listAll()
    }

    abstract validate(data: DeepPartial<Entity>)

    async beforeSave?(data: DeepPartial<Entity>): Promise<void>

    async afterSave?(data: Entity): Promise<void>

    async save(data: DeepPartial<Entity>): Promise<Entity> {
        this.validate(data)
        
        await this.beforeSave?.(data)

        const persistedEntity = await this.getRepository().save(data)

        await this.afterSave?.(persistedEntity)

        return persistedEntity
    }

    async beforeUpdate?(entity: Entity, data: DeepPartial<Entity>): Promise<void>

    async afterUpdate?(data: Entity): Promise<void>

    async update(id: number, data: DeepPartial<Entity>): Promise<Entity> {
        const savedEntity = await this.getByIdOrFail(id)

        this.validate(data)
        await this.beforeUpdate?.(savedEntity, data)

        const updatedEntity = await this.getRepository().update(savedEntity, data)

        await this.afterUpdate?.(updatedEntity)

        return updatedEntity
    }

    async beforeDelete?(data: Entity): Promise<void> 

    async afterDelete?(data: Entity): Promise<void>

    async deleteById(id: number): Promise<void> {
        const entity = await this.getByIdOrFail(id)

        await this.beforeDelete?.(entity)

        this.getRepository().deleteById(id)

        await this.afterDelete?.(entity)
    }

    protected async getByIdOrFail(id: number): Promise<Entity> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new ServiceException('O id deve ser informado');
        }

        const entity = await this.getRepository().getById(id);

        if (!entity) throw new ServiceException(`A entidade de id: ${id} não foi encontrada`);

        return entity;
    }

    getRepository() {
        return this.repository
    }
}