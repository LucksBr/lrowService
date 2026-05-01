import { DeepPartial } from 'typeorm';
import AbstractEntity from '../model/abstract.entity';

export default interface BaseCrudServiceInterface<Entity extends AbstractEntity> {

    getById(id: number): Promise<Entity>
        
    listAll(): Promise<Entity[]>
    
    save(data: DeepPartial<Entity>): Promise<Entity>
    
    update(id: number, data: DeepPartial<Entity>): Promise<Entity>

    deleteById(id: number): Promise<void>

}