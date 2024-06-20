import 'dotenv/config'
import { DataTypes, Model, QueryTypes, Sequelize } from 'sequelize'
import express from 'express'

const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

class Note extends Model {
}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

app.use(express.json())

app.get('/api/notes', async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll()
  console.log(JSON.stringify(notes, null, 2))
  res.json(notes)
})

app.get('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const note = await Note.findByPk(id)
  if (note) {
    console.log(note)
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.put('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', async (req, res) => {
  console.log(req.body)
  try {
    const note = await Note.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    console.log(notes)
    await sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

app.listen(3003, async () => {
  console.log('Server on 3003')
  await sequelize.authenticate()
  await Note.sync()

  const init_data = [
    {
      "id": 1,
      "content": "MongoDB is webscale",
      "important": false,
      "date": "2021-10-09T13:52:58.693Z"
    },
    {
      "id": 2,
      "content": "Relational databases rule the world",
      "important": true,
      "date": "2021-10-09T13:53:10.710Z"
    }
  ]

})