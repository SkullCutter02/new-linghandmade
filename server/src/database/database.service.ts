import { Injectable } from "@nestjs/common";
import { EntityName } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class DatabaseService {
  constructor(private readonly em: EntityManager) {}

  async fullTextSearch(
    entity: EntityName<any>,
    page: number,
    limit: number,
    filter: string,
    fields: string[],
  ) {
    const query = fields.join(" || ' ' || ");

    const data = await this.em
      .createQueryBuilder(entity)
      .select("*")
      .where(`to_tsvector(${query}) @@ plainto_tsquery(?)`, [filter])
      .limit(limit)
      .offset((page - 1) * limit)
      .execute("all");
    const count = await this.em
      .createQueryBuilder(entity)
      .select("*")
      .where(`to_tsvector(${query}) @@ plainto_tsquery(?)`, [filter])
      .count()
      .execute();

    return [data, count];
  }
}
