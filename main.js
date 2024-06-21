import express from 'express'
import { connectToDatabase } from './utils/db.js'
// import notesRouter from './controller/notes.js'
import { PORT } from './utils/config.js'
import blogsRouter from './controller/blogs.js'
import usersRouter from './controller/users.js'
import loginRouter from './controller/login.js'
import authorsRouter from './controller/authors.js'
import readingListsRouter from './controller/readinglists.js'

const app = express()

app.use(express.json())
// app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)

const errorHandler = (error, req, res, next) => {
  console.error('接收到了一个 error')

  return res.status(400).send({ error: error.errors[0].message })
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  })
}

start()
