import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import AbstractEntity from '../model/abstract.entity';
import BaseCrudServiceInterface from '../service/base.crud.service.interface';
import { DeepPartial } from 'typeorm';

export default abstract class AbstractCrudController<
    Entity extends AbstractEntity, 
    CreateDTO extends DeepPartial<Entity>,
    UpdateDTO extends DeepPartial<Entity>,
    ResponseDTO
> {

    constructor(private service: BaseCrudServiceInterface<Entity>){}

    getService(){
        return this.service
    }

    protected abstract toResponse(entity: Entity): ResponseDTO
    
    @Get("/list-all")
    async listAll(): Promise<ResponseDTO[]> {
        const entities = await this.getService().listAll()
        return entities.map(e => this.toResponse(e))
    }

    @Get("/:id")
    async getById(@Param('id') id: string): Promise<ResponseDTO> {
        const entity = await this.getService().getById(Number(id))
        return this.toResponse(entity)
    }
    
    @Post()
    async save(@Body() data: CreateDTO): Promise<ResponseDTO> {
        const entity = await this.getService().save(data)
        return this.toResponse(entity)
    }

    @Put(":id")
    async update(@Param('id') id: string, @Body() data: UpdateDTO): Promise<ResponseDTO> {
        const entity = await this.getService().update(Number(id), data)
         return this.toResponse(entity)
    }
        
    @Delete(":id")
    deleteById(@Param('id') id: string): Promise<void> {
        return this.getService().deleteById(Number(id))
    }

}