import { Migration } from '@mikro-orm/migrations';

export class Migration20210802110355 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "email" varchar(255) not null, "hash" varchar(255) null, "is_registered_with_google" bool not null default false, "stripe_customer_id" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "orders" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "address" varchar(255) not null, "phone_number" varchar(255) not null, "email" varchar(255) not null, "order_items" text[] not null, "user_id" varchar(255) not null);');
    this.addSql('alter table "orders" add constraint "orders_pkey" primary key ("id");');

    this.addSql('create table "coupons" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "code" varchar(255) not null, "discount" int4 not null, "used" bool not null default false, "remarks" varchar(255) null);');
    this.addSql('alter table "coupons" add constraint "coupons_pkey" primary key ("id");');
    this.addSql('alter table "coupons" add constraint "coupons_code_unique" unique ("code");');

    this.addSql('create table "categories" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "categories" add constraint "categories_pkey" primary key ("id");');
    this.addSql('alter table "categories" add constraint "categories_name_unique" unique ("name");');

    this.addSql('create table "products" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" text not null, "price" int4 not null, "discount" int4 null, "main_img_url" varchar(255) not null, "carousel_img_urls" text[] null, "amt_left" int4 not null, "featured" bool not null, "remarks" varchar(255) null, "category_id" varchar(255) not null);');
    this.addSql('alter table "products" add constraint "products_pkey" primary key ("id");');

    this.addSql('create table "users_in_cart_products" ("user_id" varchar(255) not null, "product_id" varchar(255) not null, "amount" int4 not null);');
    this.addSql('alter table "users_in_cart_products" add constraint "users_in_cart_products_pkey" primary key ("user_id", "product_id");');

    this.addSql('create table "reset_emails" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" varchar(255) not null, "token" varchar(255) not null, "expiration_date" timestamptz(0) not null);');
    this.addSql('alter table "reset_emails" add constraint "reset_emails_pkey" primary key ("id");');

    this.addSql('alter table "orders" add constraint "orders_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "users_in_cart_products" add constraint "users_in_cart_products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_in_cart_products" add constraint "users_in_cart_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');
  }

}
