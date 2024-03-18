import { BaseEntity } from '../../global/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  @Index({ unique: true, where: 'deleted_at is null' })
  email: string;

  @Column('varchar', { nullable: true, select: false })
  password?: string;
}
