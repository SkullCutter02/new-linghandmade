import { Migration } from "@mikro-orm/migrations";

export class Migration20210707153008 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "categories" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    );
    this.addSql('alter table "categories" add constraint "categories_pkey" primary key ("id");');
    this.addSql('alter table "categories" add constraint "categories_name_unique" unique ("name");');
  }

  async drop(): Promise<void> {
    this.addSql('drop table "categories"');
  }
}
