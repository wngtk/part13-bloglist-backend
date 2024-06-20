import { Router } from "express"
import { Blog } from "../models/index.js"

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const n = await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.json(n)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

export default blogsRouter
