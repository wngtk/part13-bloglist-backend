import express from 'express'
import { connectToDatabase } from './utils/db.js'
import notesRouter from './controller/notes.js'
import { PORT } from './utils/config.js'

const app = express()

app.use(express.json())
app.use('/api/notes', notesRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  })
}

start()
