import { DeepPartial } from 'typeorm';
import AbstractEntity from '../model/abstract.entity';

export default interface BaseCrudServiceInterface<Entity extends AbstractEntity> {

    getById(id: number): Promise<Entity | null>
        
    listAll(): Promise<Entity[]>
    
    save(data: DeepPartial<Entity>): Promise<Entity>
    
    deleteById(id: number): Promise<void>

}