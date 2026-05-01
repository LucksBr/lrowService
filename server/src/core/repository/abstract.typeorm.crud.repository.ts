import AbstractEntity from "../model/abstract.entity";
import { DeepPartial, Repository } from "typeorm";
import BaseRepositoryInterface from "./base.crud.repository.interface";

export default abstract class AbstractTypeOrmCrudRepository<Entity extends AbstractEntity> implements BaseRepositoryInterface<Entity> {

    constructor(private repository: Repository<Entity>) {}
    
    async getById(id: number): Promise<Entity | null> {
        return this.getRepository().findOneBy({ id } as any)
    }
    
    async listAll(): Promise<Entity[]> {
       return this.getRepository().find();
    }

    async save(data: DeepPartial<Entity>): Promise<Entity> {
       const entity = this.getRepository().create(data)
       return this.getRepository().save(entity)
    }

    async update(entityPersisted: Entity, data: DeepPartial<Entity>): Promise<Entity> {
        const merged = this.getRepository().merge(entityPersisted, data)

        return this.getRepository().save(merged);
    }

    async deleteById(id: number): Promise<void> {
        await this.getRepository().delete(id);
    }
    
    protected getRepository() {
        return this.repository;
    }

}