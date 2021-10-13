import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const ormconfig: MikroOrmModuleSyncOptions = {
  type: "postgresql",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT) || 5432,
  dbName: process.env.PG_NAME || "new_linghandmade_db",
  user: process.env.USER || null,
  password: process.env.PG_PASSWORD || null,
  baseDir: __dirname,
  entities: ["../**/*.entity.js"],
  entitiesTs: ["../**/*.entity.ts"],
  highlighter: new SqlHighlighter(),
  debug: process.env.NODE_ENV === "development",
  migrations: {
    path: __dirname + "/../migrations",
    dropTables: false,
  },
};

export = ormconfig;
