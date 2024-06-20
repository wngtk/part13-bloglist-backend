import { Router } from "express"
import { Blog } from "../models/index.js"

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    // return res.status(400).json({ error })
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

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

blogsRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    req.status(404).end()
  }
})

export default blogsRouter
