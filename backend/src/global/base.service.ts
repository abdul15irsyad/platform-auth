import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { isNotEmpty } from 'class-validator';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  protected repository: Repository<T>;
  protected relations: FindOptionsRelations<T>;
  protected translates(): FindOptionsWhere<T> | null {
    return null;
  }

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async createBulk(entities: DeepPartial<T>[]): Promise<T[]> {
    const createdEntities = this.repository.create(
      entities.map((entity) => ({ id: uuidv4(), ...entity })),
    );
    await this.repository.save(createdEntities, { chunk: 30 });
    return Promise.all(
      createdEntities.map(
        async (createdEntity) =>
          await this.findOneBy({ id: createdEntity?.id as any }),
      ),
    );
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const createdEntity = this.repository.create({
      ...entity,
      id: entity.id ?? uuidv4(),
    });
    await this.repository.save(createdEntity);
    return await this.findOneBy({ id: createdEntity?.id as any });
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    if (isNotEmpty(this.translates())) {
      options = {
        where: {
          ...this.translates(),
          ...options?.where,
        },
        ...options,
      };
    }
    return this.repository.find(options);
  }

  async countBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<number> {
    return this.repository.countBy(where);
  }

  async findOne(options: FindOneOptions<T>) {
    if (isNotEmpty(this.translates()))
      options.where = { ...this.translates(), ...options.where };
    return this.repository.findOne(options);
  }

  async findBy(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>,
  ) {
    if (isNotEmpty(this.translates()))
      where = { ...this.translates(), ...where };
    return this.repository.find({
      where,
      relations: { ...this.relations, ...relations },
    });
  }

  async findOneBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    if (isNotEmpty(this.translates()))
      where = { ...this.translates(), ...where };
    return this.repository.findOne({
      where,
      relations: { ...this.relations, ...relations },
    });
  }

  async update(
    criteria: string | FindOptionsWhere<T>,
    entity: QueryDeepPartialEntity<T>,
  ) {
    await this.repository.update(criteria, entity);
  }

  async upsert(entity: QueryDeepPartialEntity<T>) {
    await this.repository.upsert(entity, []);
  }

  async updateBulk(entities: DeepPartial<T>[]): Promise<T[]> {
    const updatedEntities = this.repository.create(
      entities.map((entity) => ({ id: entity?.id ?? uuidv4(), ...entity })),
    );
    await this.repository.save(updatedEntities, { chunk: 30 });
    return Promise.all(
      updatedEntities.map(
        async (updatedEntity) =>
          await this.findOneBy({ id: updatedEntity?.id as any }),
      ),
    );
  }

  async save(id: any, entity: DeepPartial<T>): Promise<T> {
    await this.repository.save({ id, ...entity });
    return this.findOneBy({ id });
  }

  async delete(criteria: string | string[] | FindOptionsWhere<T>) {
    return await this.repository.delete(criteria);
  }

  async softDelete(criteria: string | string[] | FindOptionsWhere<T>) {
    return await this.repository.softDelete(criteria);
  }
}
