import express from 'express'
import { connectToDatabase } from './utils/db.js'
import notesRouter from './controller/notes.js'
import { PORT } from './utils/config.js'
import blogsRouter from './controller/blogs.js'
import usersRouter from './controller/users.js'

const app = express()

app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const errorHandler = (error, req, res, next) => {
  console.error('接收到了一个 error')

  return res.status(400).send({ error })
  // next(error)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  })
}

start()
