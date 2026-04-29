import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import AbstractEntity from '../model/abstract.entity';
import BaseCrudServiceInterface from '../service/base.crud.service.interface';
import { DeepPartial } from 'typeorm';

export default abstract class AbstractCrudController<
    Entity extends AbstractEntity, 
    CreateDTO extends DeepPartial<Entity>,
    UpdateDTO extends DeepPartial<Entity>
> {

    constructor(private service: BaseCrudServiceInterface<Entity>){}

    getService(){
        return this.service
    }
    
    @Get("/list-all")
    listAll(): Promise<Entity[]> {
        return this.getService().listAll()
    }

    @Get("/:id")
    getById(@Param('id') id: string): Promise<Entity | null> {
        return this.getService().getById(Number(id))
    }
    
    @Post()
    save(@Body() data: CreateDTO): Promise<Entity> {
         return this.getService().save(data)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() data: UpdateDTO): Promise<Entity> {
         return this.getService().update(Number(id), data)
    }
        
    @Delete(":id")
    deleteById(@Param('id') id: string): Promise<void> {
        return this.getService().deleteById(Number(id))
    }

}