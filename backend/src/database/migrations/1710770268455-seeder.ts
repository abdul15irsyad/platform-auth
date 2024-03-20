import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeder21710770268455 implements MigrationInterface {
  name = 'Seeder21710770268455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seeder" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7d4f5f29c8387f8f02a38b0eb1b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seeder"`);
  }
}
