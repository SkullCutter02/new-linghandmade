import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

const productionSettings: Partial<MikroOrmModuleSyncOptions> = {
  clientUrl: process.env.DATABASE_URL || null,
  driverOptions: {
    connection: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
};

const developmentSettings: Partial<MikroOrmModuleSyncOptions> = {
  host: "localhost",
  port: 5432,
  dbName: "new_linghandmade_db",
  debug: true,
};

const setting = process.env.NODE_ENV === "production" ? productionSettings : developmentSettings;

const ormconfig: MikroOrmModuleSyncOptions = {
  ...setting,
  type: "postgresql",
  baseDir: __dirname,
  entities: ["../**/*.entity.js"],
  entitiesTs: ["../**/*.entity.ts"],
  highlighter: new SqlHighlighter(),
  migrations: {
    path: __dirname + "/../migrations",
    dropTables: false,
    disableForeignKeys: false,
  },
};

export = ormconfig;
