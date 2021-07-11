import { Migration } from "@mikro-orm/migrations";

export class Migration20210708155051 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "products" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null, "price" int4 not null, "main_img_url" varchar(255) not null, "carousel_img_urls" text[] null, "amt_left" int4 not null, "featured" bool not null, "remarks" varchar(255) null, "category_id" varchar(255) not null);',
    );
    this.addSql('alter table "products" add constraint "products_pkey" primary key ("id");');

    this.addSql(
      'alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "products"');
  }
}
