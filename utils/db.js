import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config.js'
import { SequelizeStorage, Umzug } from 'umzug'
import path from 'path';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const migrationConf = {
  migrations: {
		glob: ['migrations/*.js', { cwd: path.dirname(import.meta.url.replace('file://', '')) }],
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  console.log('cwd', path.dirname(import.meta.url.replace('file://', '')))
  const migrator = new Umzug(migrationConf)
  try {
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
      files: migrations.map(mig => mig.name)
    })
  } catch (error) {
    console.error(error)
  }
}

const rollbackMigrations = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database');
    await runMigrations()
  } catch (error) {
    console.log('failed to connect to the database');
    return process.exit(1)
  }
  return null
}

export { connectToDatabase, sequelize, rollbackMigrations }
