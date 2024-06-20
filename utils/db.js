import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config.js'

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()  
    console.log('connected to the database');
  } catch (error) {
    console.log('failed to connect to the database');
    return process.exit(1)
  }
  return null
}

export { connectToDatabase, sequelize }
