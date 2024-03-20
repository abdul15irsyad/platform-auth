import { DataSource, DeepPartial } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { SeederEntity } from '../seeder.entity';
import { NODE_ENV } from '../../app.config';
import { User } from '../../auth/user/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../auth/auth.util';
import { random, randomInt } from '../../global/utils';

export default class UserSeeder extends Seeder {
  public async run(datasource: DataSource): Promise<void> {
    // if seeder already executed
    if (
      await datasource
        .getRepository(SeederEntity)
        .findOneBy({ name: UserSeeder.name })
    )
      return;

    const newUsers: DeepPartial<User>[] = [];
    if (NODE_ENV !== 'production') {
      for (let i = 1; i <= randomInt(10, 20); i++) {
        newUsers.push({
          name: `User ${i}`,
          email: `user${i}@email.com`,
          emailVerifiedAt: random([null, new Date()]),
        });
      }
    }
    await datasource.getRepository(User).save(
      newUsers.map((newUser) => ({
        ...newUser,
        id: newUser.id ?? uuidv4(),
        password: hashPassword('Qwerty123'),
      })),
      { chunk: 30 },
    );

    // add to seeders table
    await datasource
      .getRepository(SeederEntity)
      .save({ name: UserSeeder.name });
  }
}
