import { Sequelize } from "sequelize";
import express from 'express'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })

const app = express()

app.use(express.json())


const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server listen on ${PORT}`);
// })

