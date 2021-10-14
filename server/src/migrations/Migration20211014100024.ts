import { Migration } from '@mikro-orm/migrations';

export class Migration20211014100024 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "orders" add column "price" int4 not null, add column "coupon_code" varchar(255) null;');
  }

}
