import { Router } from "express";
import { Blog, ReadingList, User } from "../models/index.js";

const usersRouter = Router()

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'marked_blogs',
      attributes: {
        exclude: ['UserId'],
        include: ['year']
      },
      through: {
        as: "readinglists",
        attributes: ['read', 'id']
      }

    }
  })

  res.json({ name: user.name, username: user.username, readings: user.marked_blogs })
})

// adding a new user
usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)  
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// listing all users
usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['UserId']}
    }
  })
  res.json(users)
})

// chaing a username, keep in mind that the parameter is not id but username
usersRouter.put('/:username', async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } })  
  if (user) {
    user.username = req.body.username
    try {
      await user.save()
      res.json(user)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(404).end()
  }
})

export default usersRouter
