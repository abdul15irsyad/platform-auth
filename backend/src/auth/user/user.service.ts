import { Injectable } from '@nestjs/common';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllDto } from 'src/global/dto/find-all.dto';
import { User } from './user.entity';
import { BaseService } from 'src/global/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  protected relations: FindOptionsRelations<User> = {};

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async findWithPagination({
    page,
    limit,
    search,
    orderBy,
    orderDir,
  }: FindAllDto = {}) {
    page = page ?? 1;
    orderBy = orderBy ?? 'createdAt';
    orderDir = orderDir ?? 'desc';
    const filter: FindOptionsWhere<User> = {};
    const findOptionsWhere: FindOptionsWhere<User> | FindOptionsWhere<User>[] =
      search
        ? [
            { name: ILike(`%${search}%`), ...filter },
            { email: ILike(`%${search}%`), ...filter },
          ]
        : filter;
    const totalAllData = await this.userRepo.countBy(findOptionsWhere);
    const data = await this.userRepo.find({
      where: findOptionsWhere,
      take: limit,
      skip: limit ? (page - 1) * limit : undefined,
      order: {
        [orderBy]: orderDir,
      },
      relations: this.relations,
    });
    const totalPage = limit
      ? Math.ceil(totalAllData / limit)
      : data.length > 0
      ? 1
      : null;
    return {
      totalPage,
      totalAllData,
      data,
    };
  }
}
