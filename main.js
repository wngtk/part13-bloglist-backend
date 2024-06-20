import express from 'express'
import { connectToDatabase } from './utils/db.js'
import notesRouter from './controller/notes.js'
import { PORT } from './utils/config.js'
import blogsRouter from './controller/blogs.js'

const app = express()

app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  })
}

start()
