const { Sequelize } = require("sequelize");
const { DATABASE_URL, PRODUCTION_DATABASE_URL } = require("./config");
const { SequelizeStorage, Umzug } = require("umzug");

const dataBase =
  process.env.NODE_ENV === "development"
    ? DATABASE_URL
    : PRODUCTION_DATABASE_URL;

const sequelize = new Sequelize(dataBase, { dialect: "postgres" });

const migrationsConf = {
  migrations: { glob: "migrations/*.js" },
  storage: new SequelizeStorage({ sequelize, tablename: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

async function runMigrations() {
  const migrator = new Umzug(migrationsConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((m) => m.name),
  });
}

async function rollbackMigrations() {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationsConf);
  await migrator.down({ to: 0 });
}

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to DB", error);
    return process.exit(1);
  }

  return null;
}

module.exports = {
  sequelize,
  rollbackMigrations,
  connectToDatabase,
};
