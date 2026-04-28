import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import AbstractEntity from '../model/abstract.entity';
import BaseCrudServiceInterface from '../service/base.crud.service.interface';
import { DeepPartial } from 'typeorm';

export default abstract class AbstractCrudController<Entity extends AbstractEntity, CreateDTO extends DeepPartial<Entity>> {

    constructor(private service: BaseCrudServiceInterface<Entity>){}

    getService(){
        return this.service
    }
    
    @Get("/get-by-id/:id")
    getById(@Param('id') id: string): Promise<Entity | null> {
        return this.getService().getById(Number(id))
    }
    
    @Get("/list-all")
    listAll(): Promise<Entity[]> {
        return this.getService().listAll()
    }

    @Post("/save")
    save(@Body() data: CreateDTO): Promise<Entity> {
         return this.getService().save(data)
    }
        
    @Delete("delete-by-id/:id")
    deleteById(@Param('id') id: string): Promise<void> {
        return this.getService().deleteById(Number(id))
    }

}