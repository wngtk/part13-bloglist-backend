import { Router } from "express"
import { Blog, User } from "../models/index.js"
import jwt from 'jsonwebtoken'
import { SECRET } from "../utils/config.js"

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith(`bearer `)) {
    try {
      console.log('token ', authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing '})
  }
  next()
}

const blogsRouter = Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['UserId']
    },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    console.log(user)
    const blog = await Blog.create({ ...req.body, UserId: user.id })
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


blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = Blog.findByPk(req.id)
  if (blog.userId != user.id) {
    return res.status(401).json({ error: 'you are not the owner' })  
  }
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
